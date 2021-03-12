// 最大堆、最小堆、优先级队列、堆排序

class Heap {
  #MAXHEAP; // MAXHEAP OR MINHEAP

  constructor(arr, maxHeap = true) {
    this.data = [null, ...arr];
    this.size = this.data.length - 1;
    this.#MAXHEAP = maxHeap;
  }

  get top() {
    return this.data[1];
  }

  #left(i) {
    return 2 * i;
  }

  #right(i) {
    return 2 * i + 1;
  }

  #parent(i) {
    return Math.floor(i / 2);
  }

  #comparer(a, b) {
    if (this.#MAXHEAP) return this.data[a] < this.data[b];
    return this.data[a] > this.data[b];
  }

  #swap(a, b) {
    let tmp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = tmp;
  }

  // O(logN)
  #sink(i) {
    while (this.#left(i) <= this.size) {
      let top = i;
      if (this.#comparer(top, this.#left(i))) {
        top = this.#left(i);
      }
      if (this.#right(i) <= this.size && this.#comparer(top, this.#right(i))) {
        top = this.#right(i);
      }
      if (top === i) break;
      this.#swap(top, i);
      i = top;
    }
  }

  // O(logN)
  #swim(i) {
    while (i > 1 && this.#comparer(this.#parent(i), i)) {
      this.#swap(this.#parent(i), i);
      i = this.#parent(i);
    }
  }

  delTop() {
    this.#swap(1, this.size);
    let top = this.data.pop();
    this.size--;
    this.#sink(1);
    return top;
  }

  insert(i) {
    this.data.append(i);
    this.size++;

    this.#swim(this.size);
  }

  // O(N)
  build() {
    for (let i = this.#parent(this.size); i >= 1; i--) {
      this.#sink(i);
    }
  }

  // O(NlogN)
  sort() {
    const size = this.size;
    while (this.size > 1) {
      this.#swap(1, this.size);
      this.size--;
      this.#sink(1);
    }
    this.size = size;
    return this.data.slice(1, this.size + 1);
  }
}

const arr = [15, 12, 8, 2, 5, 2, 3, 4, 7];
const heap = new Heap(arr);
heap.build();
console.log(heap.data);
console.log(heap.sort());

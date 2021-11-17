// 最大堆、最小堆、优先级队列、堆排序

class Heap {
  #MAXHEAP; // MAXHEAP OR MINHEAP
  #data;
  #size;

  constructor(arr, maxHeap = true) {
    this.#data = [null, ...arr];
    this.#size = this.#data.length - 1; // 若size改写成get data.length 的方法，则不可直接控制堆大小
    this.#MAXHEAP = maxHeap;
    this.#build();
  }

  get top() {
    return this.#data[1];
  }

  get data() {
    return new Proxy(this.#data, {
      set() {
        return false;
      },
    });
  }

  get size() {
    return this.#size; // 实例中只读
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

  #comparer(parent, child) {
    if (this.#MAXHEAP) return this.#data[parent] > this.#data[child];
    return this.#data[parent] < this.#data[child];
  }

  #swap(a, b) {
    let tmp = this.#data[a];
    this.#data[a] = this.#data[b];
    this.#data[b] = tmp;
  }

  // O(logN)
  #sink(i) {
    while (this.#left(i) <= this.#size) {
      let top = i;
      if (!this.#comparer(top, this.#left(i))) {
        top = this.#left(i);
      }
      if (
        this.#right(i) <= this.#size &&
        !this.#comparer(top, this.#right(i))
      ) {
        top = this.#right(i);
      }
      if (top === i) break;
      this.#swap(top, i);
      i = top;
    }
  }

  // O(logN)
  #swim(i) {
    while (i > 1 && !this.#comparer(this.#parent(i), i)) {
      this.#swap(this.#parent(i), i);
      i = this.#parent(i);
    }
  }

  // O(N)
  #build() {
    for (let i = this.#parent(this.#size); i >= 1; i--) {
      this.#sink(i);
    }
  }

  popTop() {
    this.#swap(1, this.#size);
    let top = this.#data.pop();
    this.#size--;
    this.#sink(1);
    return top;
  }

  insert(i) {
    this.#data.push(i);
    this.#size++;

    this.#swim(this.#size);
  }

  clear() {
    this.#data = [null];
    this.#size = 0;
  }

  isValid(root = 1) {
    if (root < 1 || root > this.#size) return false;

    // 可返回成功情况：自己或子节点是叶子结点
    if (this.#left(root) > this.#size) return true;
    if (
      this.#comparer(root, this.#left(root)) &&
      this.#right(root) > this.#size
    )
      return true;

    // 可返回失败情况
    if (
      !this.#comparer(root, this.#left(root)) ||
      !this.#comparer(root, this.#right(root))
    )
      return false;

    // 需递归判断情况：同时存在子节点，并且未失败
    return this.isValid(this.#left(root)) && this.isValid(this.#right(root));
  }

  // O(NlogN)
  sort() {
    const size = this.#size;
    while (this.#size > 1) {
      this.#swap(1, this.#size);
      this.#size--;
      this.#sink(1);
    }
    this.#size = size;
    const sortResult = this.#data.slice(1, this.#size + 1);
    this.#build();
    return sortResult;
  }
}

const arr = [15, 12, 8, 2, 5, 2, 3, 4, 7];
const heap = new Heap(arr);
console.log(heap.data);
heap.insert(6);
console.log(heap.sort());

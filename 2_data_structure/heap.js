// tags: #heap #priority-queue #data-structure

// 堆有最大堆/最小堆, 可用于实现优先级队列、堆排序
class Heap {
  #MAXHEAP;
  #data;
  #size;

  constructor(arr, maxHeap = true) {
    this.#MAXHEAP = maxHeap;
    this.#data = [...arr];
    this.#size = this.#data.length; // 若size改写成get data.length 的方法，则不可直接控制堆大小, 因此和 data 属性分离开
    this.#build();
  }

  get heapType() {
    return this.#MAXHEAP ? "MAXHEAP" : "MINHEAP";
  }

  get top() {
    return this.#data[0];
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

  get #lastOne() {
    return this.#size - 1;
  }

  #left(i) {
    return 2 * i + 1;
  }

  #right(i) {
    return 2 * i + 2;
  }

  #parent(i) {
    return Math.floor((i - 1) / 2);
  }

  #comparer(parent, child) {
    if (this.#MAXHEAP) return this.#data[parent] > this.#data[child];
    return this.#data[parent] < this.#data[child];
  }

  #swap(a, b) {
    [this.#data[a], this.#data[b]] = [this.#data[b], this.#data[a]];
  }

  // O(logN)
  #sink(i) {
    while (this.#left(i) <= this.#lastOne) {
      let top = i;
      if (!this.#comparer(top, this.#left(i))) {
        top = this.#left(i);
      }
      if (
        this.#right(i) <= this.#lastOne &&
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
    while (i > 0 && !this.#comparer(this.#parent(i), i)) {
      this.#swap(this.#parent(i), i);
      i = this.#parent(i);
    }
  }

  // O(N)
  #build() {
    for (let i = this.#parent(this.#lastOne); i >= 0; i--) {
      this.#sink(i);
    }
  }

  popTop() {
    this.#swap(0, this.#lastOne);
    let top = this.#data.pop();
    this.#size--;
    this.#sink(0);
    return top;
  }

  insert(i) {
    this.#data.push(i);
    this.#size++;

    this.#swim(this.#lastOne);
  }

  clear() {
    this.#data = [];
    this.#size = 0;
  }

  isValid(root = 0) {
    if (root < 0 || root > this.#lastOne) return false;

    // 可返回成功情况：自己或子节点是叶子结点
    if (this.#left(root) > this.#lastOne) return true;
    if (
      this.#comparer(root, this.#left(root)) &&
      this.#right(root) > this.#lastOne
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
    const size = this.size;
    while (this.size > 1) {
      this.#swap(0, this.#lastOne);
      this.#size--;
      this.#sink(0);
    }
    const sortResult = this.#data.slice(0, size);
    this.#size = size;
    this.#build();
    return sortResult;
  }
}

/* test code */
const assert = require("node:assert/strict");

const arr = [15, 12, 8, 2, 5, 2, 3, 4, 7];
const heap = new Heap(arr);

assert.equal(heap.isValid(), true);
heap.insert(6);
assert.deepEqual(heap.sort(), [2, 2, 3, 4, 5, 6, 7, 8, 12, 15]);

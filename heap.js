const HeapInterface = require("./heap.interface");

class Heap extends HeapInterface {
  static get defaultComparatorFn() {
    return (a, b) => a - b;
  }

  constructor(comparatorFn) {
    super();
    this.arr = [];
    this.size = 0;
    this.comparatorFn = comparatorFn || Heap.defaultComparatorFn;
  }

  push(value) {
    this.arr[this.size] = value;
    this.size++;
    this.moveUp_();
  }

  moveUp_() {
    let index = this.size - 1;
    while (
      index > 0 &&
      this.compare_(this.arr[index], this.getParentValue_(index)) < 0
    ) {
      const parentIndex = this.getParentIndex_(index);
      this.swap_(index, parentIndex);
      index = parentIndex;
    }
  }

  compare_(a, b) {
    return this.comparatorFn(a, b);
  }

  getParentValue_(index) {
    return this.arr[this.getParentIndex_(index)];
  }

  getParentIndex_(index) {
    return (index - 1) >> 1;
  }

  swap_(first, second) {
    let tmp = this.arr[first];
    this.arr[first] = this.arr[second];
    this.arr[second] = tmp;
  }

  pop() {
    if (this.size > 0) {
      const top = this.peek();
      this.bringUpLast_();
      this.moveDown_();
      return top;
    }
    return null;
  }

  peek() {
    if (!this.isEmpty()) {
      return this.arr[0];
    }
    return null;
  }

  isEmpty() {
    return this.size === 0;
  }

  bringUpLast_() {
    this.arr[0] = this.arr[this.size - 1];
    this.arr[this.size - 1] = null;
    this.size--;
  }

  moveDown_() {
    let index = 0;
    while (index < this.size) {
      const leftIndex = this.getLeft_(index);
      const hasLeftChild = this.isWithinBounds_(leftIndex);
      const rightIndex = this.getRight_(index);
      const hasRightChild = this.isWithinBounds_(rightIndex);

      if (
        !hasLeftChild ||
        this.compare_(this.arr[index], this.arr[leftIndex]) < 0
      ) {
        break;
      }

      const childIndex = !hasRightChild
        ? leftIndex
        : this.getChild_(leftIndex, rightIndex);
      this.swap_(index, childIndex);
      index = childIndex;
    }
  }

  getLeft_(index) {
    return (index << 1) + 1;
  }

  getRight_(index) {
    return (index << 1) + 2;
  }

  getChild_(leftIndex, rightIndex) {
    return this.compare_(this.arr[leftIndex], this.arr[rightIndex]) < 0
      ? leftIndex
      : rightIndex;
  }

  isWithinBounds_(index) {
    return index >= 0 && index < this.size;
  }
}

module.exports = Heap;

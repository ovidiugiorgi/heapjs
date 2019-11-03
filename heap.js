const HeapInterface = require("./heap.interface");

class Heap extends HeapInterface {
  static get defaultComparatorFn() {
    return (a, b) => a - b;
  }

  constructor(comparatorFn) {
    super();
    this._arr = [];
    this._size = 0;
    this.comparatorFn = comparatorFn || Heap.defaultComparatorFn;
  }

  push(value) {
    this._arr[this._size] = value;
    this._size++;
    this._moveUp();
  }

  _moveUp() {
    let index = this._size - 1;
    while (
      index > 0 &&
      this._compare(this._arr[index], this._getParentValue(index)) < 0
    ) {
      const parentIndex = this._getParentIndex(index);
      this._swap(index, parentIndex);
      index = parentIndex;
    }
  }

  _compare(a, b) {
    return this.comparatorFn(a, b);
  }

  _getParentValue(index) {
    return this._arr[this._getParentIndex(index)];
  }

  _getParentIndex(index) {
    return (index - 1) >> 1;
  }

  _swap(first, second) {
    let tmp = this._arr[first];
    this._arr[first] = this._arr[second];
    this._arr[second] = tmp;
  }

  pop() {
    if (this._size > 0) {
      const top = this.peek();
      this._bringUpLast();
      this._moveDown();
      return top;
    }
    return null;
  }

  peek() {
    if (!this.isEmpty()) {
      return this._arr[0];
    }
    return null;
  }

  isEmpty() {
    return this._size === 0;
  }

  _bringUpLast() {
    this._arr[0] = this._arr[this._size - 1];
    this._arr[this._size - 1] = null;
    this._size--;
  }

  _moveDown() {
    let index = 0;
    while (index < this._size) {
      const leftIndex = this._getLeft(index);
      const hasLeftChild = this._isWithinBounds(leftIndex);
      const rightIndex = this._getRight(index);
      const hasRightChild = this._isWithinBounds(rightIndex);

      if (
        !hasLeftChild ||
        this._compare(this._arr[index], this._arr[leftIndex]) < 0
      ) {
        break;
      }

      const childIndex = !hasRightChild
        ? leftIndex
        : this._getChild(leftIndex, rightIndex);
      this._swap(index, childIndex);
      index = childIndex;
    }
  }

  _getLeft(index) {
    return (index << 1) + 1;
  }

  _getRight(index) {
    return (index << 1) + 2;
  }

  _getChild(leftIndex, rightIndex) {
    return this._compare(this._arr[leftIndex], this._arr[rightIndex]) < 0
      ? leftIndex
      : rightIndex;
  }

  _isWithinBounds(index) {
    return index >= 0 && index < this._size;
  }

  size() {
    return this._size;
  }
}

module.exports = Heap;

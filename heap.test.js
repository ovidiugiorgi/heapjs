const Heap = require("./heap");

let heap;

describe("default comparator - minimum", () => {
  beforeEach(() => {
    heap = new Heap();
  });

  describe("isEmpty", () => {
    test("should be empty after it's created", () => {
      expect(heap.isEmpty()).toBe(true);
    });

    test("should not be empty after adding one element", () => {
      heap.push(1);
      expect(heap.isEmpty()).toBe(false);
    });

    test("should be empty after removing all emements", () => {
      heap.push(2);
      heap.push(3);
      heap.pop();
      heap.pop();
      expect(heap.isEmpty()).toBe(true);
    });
  });

  describe("pop", () => {
    test("should return null when it's empty", () => {
      heap.push(5);
      heap.push(7);
      heap.pop();
      heap.pop();
      expect(heap.pop()).toBeNull();
    });

    test("should return the minimum element after just one pop", () => {
      heap.push(2);
      heap.push(5);
      heap.push(1);
      heap.push(10);
      expect(heap.pop()).toBe(1);
    });

    test("should return the minimum element after multiple pops", () => {
      heap.push(12);
      heap.push(15);
      heap.push(7);
      heap.push(11);
      expect(heap.pop()).toBe(7);
      expect(heap.pop()).toBe(11);
      expect(heap.pop()).toBe(12);
      expect(heap.pop()).toBe(15);
      heap.push(7);
      heap.push(5);
      heap.push(19);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(7);
      heap.push(27);
      expect(heap.pop()).toBe(19);
      heap.push(25);
      heap.push(15);
      expect(heap.pop()).toBe(15);
      expect(heap.pop()).toBe(25);
      expect(heap.pop()).toBe(27);
      heap.push(2);
      heap.push(10);
      heap.push(7);
      heap.push(15);
      heap.push(16);
      heap.push(9);
      heap.push(11);
      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(7);
      expect(heap.pop()).toBe(9);
      expect(heap.pop()).toBe(10);
      expect(heap.pop()).toBe(11);
      expect(heap.pop()).toBe(15);
      expect(heap.pop()).toBe(16);
      heap.push(2);
      heap.push(9);
      heap.push(5);
      heap.push(3);
      expect(heap.pop()).toBe(2);
      expect(heap.pop()).toBe(3);
      expect(heap.pop()).toBe(5);
      expect(heap.pop()).toBe(9);
      heap.push(8);
      heap.push(15);
      heap.push(12);
      heap.push(15);
      heap.push(15);
      expect(heap.pop()).toBe(8);
      expect(heap.pop()).toBe(12);
      expect(heap.pop()).toBe(15);
      expect(heap.pop()).toBe(15);
      expect(heap.pop()).toBe(15);
    });
  });

  describe("peek", () => {
    test("should return null when it's empty", () => {
      expect(heap.peek()).toBeNull();
    });

    test("should return the element when it has just one", () => {
      heap.push(7);
      expect(heap.peek()).toBe(7);
    });

    test("should return the minimum element", () => {
      heap.push(7);
      heap.push(10);
      heap.push(2);
      heap.push(4);
      expect(heap.peek()).toBe(2);
    });

    test("should not alter the elements", () => {
      heap.push(5);
      heap.push(7);
      expect(heap.peek()).toBe(5);
      expect(heap.peek()).toBe(5);
    });
  });
});

describe("custom comparator - maximum", () => {
  beforeEach(() => {
    const maxComparator = (a, b) => -1 * (a - b);
    heap = new Heap(maxComparator);
  });

  test("should return the maximum element", () => {
    heap.push(5);
    heap.push(2);
    heap.push(10);
    heap.push(8);
    expect(heap.peek()).toBe(10);
    expect(heap.pop()).toBe(10);
    expect(heap.pop()).toBe(8);
    expect(heap.pop()).toBe(5);
    expect(heap.pop()).toBe(2);
    heap.push(11);
    heap.push(2);
    expect(heap.pop()).toBe(11);
    heap.push(1);
    expect(heap.pop()).toBe(2);
    heap.push(5);
    heap.push(51);
    heap.push(1000);
    heap.push(77);
    expect(heap.pop()).toBe(1000);
    expect(heap.pop()).toBe(77);
    expect(heap.pop()).toBe(51);
    expect(heap.pop()).toBe(5);
  });
});

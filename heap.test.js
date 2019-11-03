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
    test("should return null when empty", () => {
      heap.push(5);
      heap.push(7);
      heap.pop();
      heap.pop();
      expect(heap.pop()).toBeNull();
    });

    test("should return the minimum elements for randomized stream", () => {
      let size = 1000;
      const range = 100000;
      const list = getRandomIntList(size, -range, range);
      list.forEach(i => heap.push(i));
      list.sort((a, b) => a - b);
      const heapList = [];
      while (size--) {
        heapList.push(heap.pop());
      }
      checkLists(list, heapList);
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

  describe("size", () => {
    test("should return 0 when empty", () => {
      expect(heap.size()).toBe(0);
    });

    test("should return the correct number when not emty", () => {
      heap.push(9);
      heap.push(5);
      heap.push(11);
      expect(heap.size()).toBe(3);
      heap.pop();
      heap.pop();
      expect(heap.size()).toBe(1);
      heap.pop();
      expect(heap.size()).toBe(0);
      heap.pop();
      heap.pop();
      expect(heap.size()).toBe(0);
    });
  });
});

describe("custom comparator - maximum", () => {
  const maxComparator = (a, b) => b - a;

  beforeEach(() => {
    heap = new Heap(maxComparator);
  });

  test("should return the maximum element for randomized stream", () => {
    let size = 1000;
    const range = 100000;
    const list = getRandomIntList(size, -range, range);
    list.forEach(i => heap.push(i));
    list.sort(maxComparator);
    const heapList = [];
    while (size--) {
      heapList.push(heap.pop());
    }
    checkLists(list, heapList);
  });
});

function checkLists(first, second) {
  expect(first.length).toBe(second.length);

  for (let i = 0; i < first.length; i++) {
    expect(first[i]).toBe(second[i]);
  }
}

function getRandomIntList(size, min, max) {
  const list = [];
  for (let i = 0; i < size; i++) {
    list.push(getRandomInt(min, max));
  }
  return list;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

# HeapJS

Simple [Heap](<https://en.wikipedia.org/wiki/Heap_(data_structure)>) implementation for JavaScript.

## Supported Operations

- push: O(logN)
- peek: O(1)
- pop: O(logN)
- isEmpty: O(1)

## Comparator

- default configuration is for a _Min-Heap_.
- if you need let's say a Max-Heap, you can pass a custom comparator function to the constructor:

```
const heap = new Heap((a, b) => (-1) * (a - b));
heap.push(7);
heap.push(5);
heap.push(10);
heap.pop(); // 10
heap.pop(); // 7
heap.pop(); // 5
```

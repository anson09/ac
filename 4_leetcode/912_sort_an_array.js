// https://leetcode.cn/problems/sort-an-array/

// version 1
// bubblesort
// time: TLE
function sortArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j + 1] < array[j]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

// version 2
// selectsort
// time: 8500ms
function sortArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let maxIdx = 0;
    for (let j = 1; j <= i; j++) {
      if (array[j] > array[maxIdx]) {
        maxIdx = j;
      }
    }
    [array[i], array[maxIdx]] = [array[maxIdx], array[i]];
  }

  return array;
}

// version 3
// quicksort
// quicksort is unstable sort, v8 offer stable sort since chrome 70 | node 12
// time: O(nlogn)
// space: O(n) | JavaScript heap out of memory
// badest case when recursion deep is N: time: O(n^2), space: O(n^2)
function sortArray(array) {
  if (array.length <= 1) return array;
  const pivot = array[0];
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [...sortArray(left), pivot, ...sortArray(right)];
}

// version 4
// quicksort
// time: O(nlogn) | 1336 ms | beat 50%
// space: O(logn)
// badest case when recursion deep is N: time: O(n^2), space: O(n)
function sortArray(array) {
  shuffle(array);
  sort(array, 0, array.length - 1);
  return array;

  function sort(arr, left, right) {
    if (left >= right) return;
    // 类前序遍历
    const p = partition(arr, left, right);
    sort(arr, left, p - 1);
    sort(arr, p + 1, right);
  }

  function partition(arr, left, right) {
    const pivot = arr[left];
    let i = left + 1;
    let j = right;
    while (i <= j) {
      while (i < right && arr[i] <= pivot) i++;
      while (j > left && arr[j] > pivot) j--;
      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[left], arr[j]] = [arr[j], arr[left]];
    return j;
  }

  // adding shuffle boosts 2000ms
  function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      const rand = Math.floor(Math.random() * arr.length);
      [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
  }
}

/* test code */
const assert = require("node:assert/strict");

function testRunner(f) {
  const array = [1, 2, 1, 3, 9, 10, 6, 8, 7, 5, 4];
  assert.deepEqual(
    f([...array]),
    [...array].sort((a, b) => a - b) // v8 version is 208ms
  );
}

testRunner(sortArray);

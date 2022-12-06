function quicksort(array) {
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
  return [...quicksort(left), pivot, ...quicksort(right)];
}

/* test code */
const assert = require("node:assert/strict");

function testRunner(f) {
  const array = [1, 2, 1, 3, 9, 10, 6, 8, 7, 5, 4];
  assert.deepEqual(
    f([...array]),
    [...array].sort((a, b) => a - b)
  );
}

testRunner(quicksort);

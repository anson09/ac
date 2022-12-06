function selectSort(array) {
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

/* test code */
const assert = require("node:assert/strict");

function testRunner(f) {
  const array = [1, 2, 1, 3, 9, 10, 6, 8, 7, 5, 4];
  assert.deepEqual(
    f([...array]),
    [...array].sort((a, b) => a - b)
  );
}

testRunner(selectSort);

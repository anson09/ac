// tags: #math #hot

// implementing a shift funtion pass below test

function shift(arr, bit) {
  const result = Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let pos = (i + bit) % arr.length;
    if (pos < 0) pos += arr.length;
    result[pos] = arr[i];
  }
  return result;
}
/* test code */

const assert = require("node:assert/strict");

assert.deepEqual(shift([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]);
assert.deepEqual(shift([1, 2, 3, 4, 5], -7), [3, 4, 5, 1, 2]);

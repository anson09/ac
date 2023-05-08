// tags: #subset

// have 2 order array A and B, judging whether B is subset of A

function subset(a, b) {
  let i = 0;
  let j = 0;

  while (i < a.length && j < b.length) {
    if (b[j] === a[i]) {
      i++;
      j++;
    } else if (b[j] > a[i]) {
      i++;
    } else break;
  }

  if (j === b.length) return true;
  return false;
}

/* test code */

const assert = require("node:assert/strict");

assert.equal(subset([-1, 0, 1, 2, 3, 4, 5], [-1, 1, 2, 3]), true);
assert.equal(subset([-1, 0, 1, 2, 3, 4, 5], [0, 1, 2, 3, 6]), false);
assert.equal(subset([3, 3, 7, 9], [3, 3, 7, 9]), true);
assert.equal(subset([3, 5, 7, 9], [3, 3, 9]), false);

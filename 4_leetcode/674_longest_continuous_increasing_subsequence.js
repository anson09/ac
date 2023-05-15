// tags: #array #hot

// https://leetcode.cn/problems/longest-continuous-increasing-subsequence/

// time: 56ms | beat 94%
var findLengthOfLCIS = function (nums) {
  let start = 0;
  let max = 1;
  for (let end = 1; end < nums.length; end++) {
    if (nums[end] > nums[end - 1]) {
      max = Math.max(max, end - start + 1);
    } else {
      start = end;
    }
  }
  return max;
};

/* test code */

const assert = require("node:assert/strict");

assert.equal(findLengthOfLCIS([1, 3, 5, 4, 7]), 3);
assert.equal(findLengthOfLCIS([2, 2, 2, 2, 2]), 1);
assert.equal(findLengthOfLCIS([1, 3, 5, 7]), 4);

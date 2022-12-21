// https://leetcode.cn/problems/two-sum/

// version 1
var twoSum = function (nums, target) {
  const map = new Map();
  nums.forEach((num, idx) => map.set(num, idx));

  for (let i = 0; i < nums.length; i++) {
    const pair = map.get(target - nums[i]);
    if (pair && pair !== i) return [i, pair];
  }
};

// version 2
// 只循环一次且 map 不需要塞满
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const pair = map.get(target - nums[i]);
    // note here pair could be 0, so can't use if (pair)
    if (pair !== undefined) return [pair, i];
    map.set(nums[i], i);
  }
};

/* test code */
const assert = require("node:assert/strict");

// 同一个位置元素不能使用两次，但不同位置同值元素没问题
assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
assert.deepEqual(twoSum([1, 3, 4, 2], 6), [2, 3]);

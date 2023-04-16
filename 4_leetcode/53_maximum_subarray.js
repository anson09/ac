// tags: #dp

// https://leetcode.cn/problems/maximum-subarray/

// time: O(n) 112ms | beat 7%
// space: O(n)
var maxSubArray = function (nums) {
  const dp = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dp.push(Math.max(nums[i], nums[i] + dp.at(-1)));
  }
  return Math.max(...dp);
};

// time: O(n) | 68ms | beat 99%
// space: O(1)
var maxSubArray = function (nums) {
  let max = -Infinity;
  let sub = 0;
  for (let num of nums) {
    if (sub > 0) sub += num;
    else sub = num;
    max = Math.max(max, sub);
  }
  return max;
};

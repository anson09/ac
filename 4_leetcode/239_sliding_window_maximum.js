// tags: #monotonic-queue

// https://leetcode.cn/problems/sliding-window-maximum/

// time: O(kn) | TLE
var maxSlidingWindow = function (nums, k) {
  const result = [];
  for (let i = 0; i <= nums.length - k; i++) {
    result.push(Math.max(...nums.slice(i, i + k)));
  }
  return result;
};

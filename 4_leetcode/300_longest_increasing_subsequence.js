// tags: #backtracking #combination #dp #LIS

// https://leetcode.cn/problems/longest-increasing-subsequence/

// time: O(2^n) | TLE
var lengthOfLIS = function (nums) {
  let largest = [];
  let current = [];

  dfs(0);
  return largest.length;

  function dfs(start) {
    for (
      let i = start;
      nums.length - i > largest.length - current.length;
      i++
    ) {
      if (current.length !== 0 && nums[i] <= current.at(-1)) continue;
      current.push(nums[i]);
      if (current.length > largest.length) largest = [...current];
      dfs(i + 1);
      current.pop();
    }
  }
};

// time: O(2^n) | 108ms | beat 79%
var lengthOfLIS = function (nums) {
  const dp = [1];
  for (let i = 1; i < nums.length; i++) {
    let max = 0;
    for (let j = 0; j < dp.length; j++) {
      if (nums[i] > nums[j] && dp[j] > max) max = dp[j];
    }
    dp[i] = max + 1;
  }
  return Math.max(...dp);
};

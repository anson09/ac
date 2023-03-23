// https://leetcode.cn/problems/climbing-stairs/

// version 1
// time: O(2^n)
var climbStairs = function (n) {
  if (n === 1 || n === 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
};

// version 2
// time: O(n)
// space: O(n)
var climbStairs = function (n) {
  const dp = [1, 2];
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};

// version 3
// 一维压零维
// time: O(n) | 48 ms | beat 99%
// space: O(1)
var climbStairs = function (n) {
  if (n === 1 || n === 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

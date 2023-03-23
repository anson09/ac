// https://leetcode.cn/problems/min-cost-climbing-stairs/

// version 1
// time: O(n^2)
var minCostClimbingStairs = function (cost) {
  cost[cost.length] = 0;
  function dp(i) {
    if (i === 0 || i === 1) {
      return cost[i];
    }
    return Math.min(dp(i - 1), dp(i - 2)) + cost[i];
  }
  return dp(cost.length - 1);
};

// version 2
// time: O(n)
// space: O(n)
var minCostClimbingStairs = function (cost) {
  const dp = [cost[0], cost[1]];
  cost[cost.length] = 0;
  for (let i = 2; i < cost.length; i++) {
    dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
  }
  return dp[dp.length - 1];
};

// version 3
// time: O(n) | 68ms | beat 45%
// space: O(1)
var minCostClimbingStairs = function (cost) {
  let a = cost[0];
  let b = cost[1];
  for (let i = 2; i < cost.length; i++) {
    [a, b] = [b, Math.min(a, b) + cost[i]];
  }
  return Math.min(a, b);
};

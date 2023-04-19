// tags: #dp

// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

// time: O(n^2) | TLE
var maxProfit = function (prices) {
  let max = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max = Math.max(max, prices[j] - prices[i]);
    }
  }
  return max;
};

// time: O(n) | 92ms | beat 38%
var maxProfit = function (prices) {
  let max = 0;
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    max = Math.max(prices[i] - min, max);
    min = Math.min(prices[i], min);
  }

  return max;
};

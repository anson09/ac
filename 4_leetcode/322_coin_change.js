// https://leetcode.cn/problems/coin-change/

// version 1
// k is the number of coins, n is the amount
// time: O(k^n) | TLE
// space: O(n)
var coinChange = function (coins, amount) {
  if (amount === 0) return 0;
  if (amount < 0) return -1;
  let min = Infinity;
  for (let coin of coins) {
    let sub = coinChange(coins, amount - coin);
    if (sub === -1) continue;
    min = Math.min(min, sub + 1);
  }
  return min === Infinity ? -1 : min;
};

// version 2
// top-down dp
// time: O(kn) | 120ms
// space: O(n)
var coinChange = function (coins, amount, memo = {}) {
  if (amount === 0) return 0;
  if (amount < 0) return -1;
  if (memo[amount]) return memo[amount];

  let min = Infinity;
  for (let coin of coins) {
    let sub = coinChange(coins, amount - coin, memo);
    if (sub === -1) continue;
    min = Math.min(min, sub + 1);
  }
  return (memo[amount] = min === Infinity ? -1 : min);
};

// version 3
// bottom-up dp
// time: O(kn) | 110ms
// space: O(n)
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

// version 4
// bottom-up dp performance tweak
// time: 80ms | beat 100%
var coinChange = function (coins, amount) {
  if (!amount) return 0;
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

console.assert(coinChange([1, 2, 5, 9], 51) === 7);

// https://leetcode.cn/problems/coin-change-ii/

// version 1
// time: TLE
// in lc‘s failed case, cache hit happened only 3368 times
var change = function (amount, coins) {
  const memo = {};

  return dp(coins.length, amount);

  function dp(i, j) {
    if (j === 0) return 1;
    if (i === 0 || j < 0) return 0;

    const key = i + "-" + j;
    if (memo[key]) return memo[key];

    // 完全背包元素可以重复拿取，所以此处是 dp(i, j - coins[i - 1])) 而不是 dp(i - 1, j - coins[i - 1]))
    return (memo[key] = dp(i - 1, j) + dp(i, j - coins[i - 1]));
  }
};

// version 2
// time: 96ms
var change = function (amount, coins) {
  const dp = [...Array(coins.length + 1)].map(() => Array(amount + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= coins.length; i++) {
    for (let j = 0; j <= amount; j++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[coins.length][amount];
};

// version 3
// time: 68ms | beat 55%

var change = function (amount, coins) {
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[amount];
};

// tags: #dp #knapsack

// top-down
function knapsack01(weights, values, capacity) {
  const memo = {};

  function dp(i, j) {
    if (i === 0 || j === 0) return 0;

    const key = `${i}-${j}`;
    if (memo[key]) return memo[key];

    if (j - weights[i - 1] < 0) return (memo[key] = dp(i - 1, j));
    return (memo[key] = Math.max(
      dp(i - 1, j),
      dp(i - 1, j - weights[i - 1]) + values[i - 1]
    ));
  }

  return dp(weights.length, capacity);
}

// bottom-up
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  // dp[i][j] 表示前 i 个物品，容量为 j 时的最大价值
  // i、j 从 1 开始计算, if (i === 0 || j === 0) dp[i][j] === 0
  const dp = [...Array(n + 1)].map(() => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= capacity; j++) {
      // weights 和 values 数组是从 0 开始存储的，所以第 i 个物品在 i - 1 位
      if (j - weights[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        // 二维数组依赖 capacity、weights 都是整数，top-down 的不需要
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weights[i - 1]] + values[i - 1]
        );
      }
    }
  }
  return dp[n][capacity];
}

/* test code */
const assert = require("node:assert/strict");
assert.equal(knapsack01([2, 1, 3], [4, 2, 3], 4), 6);
assert.equal(knapsack01([1, 2, 3, 4], [2, 4, 4, 5], 5), 8);

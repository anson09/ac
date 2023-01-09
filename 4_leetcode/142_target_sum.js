// https://leetcode.cn/problems/target-sum/

// version 1
// time: O(2^n)
// 回溯
var findTargetSumWays = function (nums, target) {
  let count = 0;
  let sum = 0;
  dfs(0);
  return count;

  function dfs(index) {
    if (index === nums.length) {
      if (sum === target) count++;
      return;
    }

    [-nums[index], nums[index]].forEach((i) => {
      sum += i;
      dfs(index + 1);
      sum -= i;
    });
  }
};

// version 2
// time: O(2^n)
// 二叉树递归, 不用回溯操作
var findTargetSumWays = function (nums, target) {
  function dfs(index, remain) {
    if (index === nums.length) {
      return remain === 0 ? 1 : 0;
    }
    return (
      dfs(index + 1, remain - nums[index]) +
      dfs(index + 1, remain + nums[index])
    );
  }
  return dfs(0, target);
};

// version 3
// time: O(2^n)
// 缓存优化, 同层相同子问题只计算一次，然而针对 lc 的用例命中率不高，加上缓存读写开销后比第一个版本还慢
var findTargetSumWays = function (nums, target) {
  const cache = {};

  function dfs(index, remain) {
    if (index === nums.length) {
      return remain === 0 ? 1 : 0;
    }
    const key = `${index}-${remain}`;
    if (cache[key]) return cache[key];
    return (cache[key] =
      dfs(index + 1, remain - nums[index]) +
      dfs(index + 1, remain + nums[index]));
  }
  return dfs(0, target);
};

// version 4
// time O(n * sum)
// 先确定 dp 数组定义：dp[i][j] 表示前 i 个数，和为 j 的方法数。通常 dp 数组的值就定义为问题的结果
// 然后确定递归终止状态和状态转移方程
// 最后加上 cache

var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum < Math.abs(target) || (sum + target) % 2 === 1) return 0;

  const memo = {};
  return dp(nums.length, (sum + target) / 2);

  function dp(i, j) {
    if (i === 0 && j === 0) return 1;
    if (i === 0 || j < 0) return 0;

    const key = `${i}-${j}`;
    if (memo[key]) return memo[key];

    // nums 从 0 开始，第i个数在 nums[i - 1]
    return (memo[key] = dp(i - 1, j) + dp(i - 1, j - nums[i - 1]));
  }
};

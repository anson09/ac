// https://leetcode.cn/problems/target-sum/

// version 1
// time: O(2^n) | 4000ms
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
// time: O(2^n) | 2600ms
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
// time: O(2^n) | 4400ms
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
// time: O(n * sum) | 1000ms
// 先确定 dp 数组定义：dp[i][j] 表示前 i 个数，和为 j 的方法数。通常 dp 数组的值就定义为问题的结果
// 然后确定递归终止状态和状态转移方程
// 最后加上 cache
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b);
  // 这两种情况无解
  if (sum < Math.abs(target) || (sum + target) % 2 === 1) return 0;

  const memo = {};
  // 问题转化推导，nums划分为A、B两个集合
  // sum(A) - sum(B) = target
  // sum(A) = target + sum(B)
  // 2 * sum(A) = target + sum(A) + sum(B)
  // sum(A) = (target + sum(nums)) / 2
  // 转化为子集划分问题
  return dp(nums.length, (sum + target) / 2);

  function dp(i, j) {
    // if (i!==0 && j===0)，若 nums 里有 0，情况就不止一种，所以不能直接返回
    if (i === 0 && j === 0) return 1;
    if (i === 0 || j < 0) return 0;

    const key = `${i}-${j}`;
    if (memo[key]) return memo[key];

    // nums 从 0 开始，第i个数在 nums[i - 1]
    return (memo[key] = dp(i - 1, j) + dp(i - 1, j - nums[i - 1]));
  }
};

// version 5
// time: O(n * sum) | 68ms | beat 81%
// space: O(n * sum)
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum < Math.abs(target) || (sum + target) % 2 === 1) return 0;

  const len = nums.length;
  const subsetSum = (sum + target) / 2;
  const dp = [...Array(len + 1)].map(() => Array(subsetSum + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= len; i++) {
    for (let j = 0; j <= subsetSum; j++) {
      if (j >= nums[i - 1]) {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[len][subsetSum];
};

// version 6
// time: O(n * sum) | 68ms | beat 81%
// space: O(sum)
// 空间二维压缩一维，dp[i][j] 只和 dp[i-i][...]有关，也就是每一行信息仅用于计算下一行，最终只取最后一行，所以其实用一行空间不断原地迭代下一行就行
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b);
  if (sum < Math.abs(target) || (sum + target) % 2 === 1) return 0;

  const len = nums.length;
  const subsetSum = (sum + target) / 2;
  const dp = Array(subsetSum + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= len; i++) {
    // 这里 j 改为逆向遍历更新，如果正向的话， dp[j - nums[i - 1]] 已经是新的一行的值了，不是上一行的值
    for (let j = subsetSum; j >= nums[i - 1]; j--) {
      dp[j] = dp[j] + dp[j - nums[i - 1]]; // 对照上一个方案，等式右侧是上一行的两个值，左侧是新一行的值
    }
  }

  return dp[subsetSum];
};

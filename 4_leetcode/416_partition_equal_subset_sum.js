// https://leetcode.cn/problems/partition-equal-subset-sum/

// version 1
// 回溯
// time: TLE
var canPartition = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  let tmpSum = 0;
  if (dfs(0)) return true;
  return false;

  function dfs(idx) {
    if (tmpSum === target) return true;
    if (tmpSum > target || idx === nums.length) return false;

    for (let i = idx; i < nums.length; i++) {
      tmpSum += nums[i];
      if (dfs(i + 1)) return true;
      tmpSum -= nums[i];
    }
  }
};

// version 2
// time: O(n*sum) | 2100ms | beat 5%
var canPartition = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  // 无 cache 会 TLE
  const memo = {};
  return dp(nums.length, target);

  function dp(i, j) {
    if (j === 0) return true;
    if (i === 0 || j < 0) return false;

    if (Object.hasOwn(memo, i + "-" + j)) return memo[i + "-" + j];

    if (dp(i - 1, j) || dp(i - 1, j - nums[i - 1]))
      return (memo[i + "-" + j] = true);
    return (memo[i + "-" + j] = false);
  }
};

// version 3
// time: O(n*sum) | 244ms | beat 27%
// space: O(n*sum)
var canPartition = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const dp = [...Array(nums.length + 1)].map(() =>
    Array(target + 1).fill(false)
  );
  dp[0][0] = true;

  for (let i = 1; i <= nums.length; i++) {
    for (let j = 0; j <= target; j++) {
      if (j - nums[i - 1] < 0) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      }
    }
  }

  return dp[nums.length][target];
};

// version 4
// time: O(n*sum) | 128ms | beat 56%
// space: O(sum)
var canPartition = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;

  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }
  return dp[target];
};

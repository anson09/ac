// https://leetcode.cn/problems/3sum/

//三个版本都是 time O(n^2)，在不断做常数项优化

// version 1
// time: 3248ms
var threeSum = function (nums) {
  const result = [];
  const map = new Map(); // 查表减少一层循环, 注意此处只存储了相同值的最后一个位置但不影响此问题结果
  const set = new Set(); // 用哈希表查找代替 candidate 每次在 result 中遍历去重，利用此优化刚好能卡 TLE
  nums.forEach((num, idx) => map.set(num, idx));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const target = -(nums[i] + nums[j]);
      if (map.get(target) > j) {
        const candidate = [nums[i], nums[j], target].sort((a, b) => a - b);
        if (!set.has(candidate.join())) {
          set.add(candidate.join());
          result.push(candidate);
        }
      }
    }
  }
  return result;
};

// version 2
// 利用双指针，减少一层循环，代替 Map 查表
// time: 632ms
var threeSum = function (nums) {
  const result = [];
  const set = new Set();
  nums.sort((a, b) => a - b);

  for (let i = nums.length; i >= 2; i--) {
    j = 0;
    k = i - 1;
    while (j < k) {
      const sum = nums[j] + nums[k] + nums[i];
      const candidate = [nums[j], nums[k], nums[i]];

      if (sum === 0) {
        if (!set.has(candidate.join())) {
          set.add(candidate.join());
          result.push(candidate);
        }
        j++;
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        k--;
      }
    }
  }
  return result;
};

// version 3
// 剪枝并优化掉哈希表
// time: 152ms | beat 40%
var threeSum = function (nums) {
  const result = [];
  const len = nums.length;
  if (len < 3) return result;

  nums.sort((a, b) => a - b);

  for (let i = 0; i < len - 2; i++) {
    if (nums[i] > 0) break; // 剪枝
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去重

    let j = i + 1;
    let k = len - 1;

    while (j < k) {
      if (nums[i] + nums[j] > 0) break; // 剪枝
      const sum = nums[i] + nums[j] + nums[k];

      if (sum === 0) {
        result.push([nums[i], nums[j], nums[k]]);
        while (j < k && nums[j] === nums[++j]); // 去重
        while (j < k && nums[k] === nums[--k]); // 去重
      } else if (sum < 0) {
        j++;
      } else {
        k--;
      }
    }
  }

  return result;
};

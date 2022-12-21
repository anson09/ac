// https://leetcode.cn/problems/3sum/

// version 1

var threeSum = function (nums) {
  const result = [];
  const map = new Map();
  const set = new Set();
  nums.forEach((num, idx) => map.set(num, idx));

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const target = -(nums[i] + nums[j]);
      if (![undefined, i, j].includes(map.get(target))) {
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

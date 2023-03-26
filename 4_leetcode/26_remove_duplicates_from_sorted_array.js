// https://leetcode.cn/problems/remove-duplicates-from-sorted-array/

// time: O(n) | 72ms |beat 67%
var removeDuplicates = function (nums) {
  let i = 0;
  let j = 1;
  while (j < nums.length) {
    if (nums[j] === nums[i]) j++;
    else {
      i++;
      [nums[i], nums[j]] = [nums[j], nums[i]];
      j++;
    }
  }
  return i + 1;
};

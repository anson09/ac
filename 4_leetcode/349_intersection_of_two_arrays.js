// https://leetcode.cn/problems/intersection-of-two-arrays/

// version 1
// time: O(n) | 64ms | beat 60%
var intersection = function (nums1, nums2) {
  const res = [];
  const [long, short] =
    nums1.length > nums2.length
      ? [new Set(nums1), new Set(nums2)]
      : [new Set(nums2), new Set(nums1)];

  for (let i of short) {
    long.has(i) && res.push(i);
  }

  return res;
};

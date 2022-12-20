// https://leetcode.cn/problems/intersection-of-two-arrays/

// time O(n)
var intersection = function (nums1, nums2) {
  const result = [];
  const map = new Map();
  nums1.forEach((num) => map.set(num, true));
  nums2.forEach((num) => map.get(num) && result.push(num));
  return [...new Set(result)];
};

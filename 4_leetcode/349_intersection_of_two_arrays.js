// tags: #hashmap

// https://leetcode.cn/problems/intersection-of-two-arrays/

// version 1
// time: O(n) | 52ms | beat 99%
var intersection = function (nums1, nums2) {
  const res = [];
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  for (let i of set2) {
    set1.has(i) && res.push(i);
  }

  return res;
};

// https://leetcode.cn/problems/single-number/

var singleNumber = function (nums) {
  return (
    [...new Set(nums)].reduce((pre, cur) => (pre += cur)) * 2 -
    nums.reduce((pre, cur) => (pre += cur))
  );
};

// version 2
var singleNumber = function (nums) {
  return nums.reduce((pre, cur) => (pre ^= cur));
};

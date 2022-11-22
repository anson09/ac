// https://leetcode-cn.com/problems/single-number

var singleNumber = function (nums) {
  return (
    [...new Set(nums)].reduce((pre, cur) => (pre += cur)) * 2 -
    nums.reduce((pre, cur) => (pre += cur))
  );
};

// version 2
var singleNumber2 = function (nums) {
  return nums.reduce((pre, cur) => (pre ^= cur));
};

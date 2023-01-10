// https://leetcode.cn/problems/single-number/

// version 1
// time: 72ms
var singleNumber = function (nums) {
  return (
    [...new Set(nums)].reduce((pre, cur) => (pre += cur)) * 2 -
    nums.reduce((pre, cur) => (pre += cur))
  );
};

// version 2
// time: 64ms | beat 75%
var singleNumber = function (nums) {
  return nums.reduce((pre, cur) => (pre ^= cur));
};

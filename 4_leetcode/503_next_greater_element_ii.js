// https://leetcode.cn/problems/next-greater-element-ii/

// time: 108ms | beat 32%
var nextGreaterElements = function (nums) {
  const res = Array(nums.length).fill(-1);
  const stack = [];

  for (let i = 2 * nums.length - 1; i >= 0; i--) {
    const mod = i % nums.length;
    // 不 double 空间直接模拟 double 的 nums，num[mod]和 num[i]是一样的
    while (stack.length && nums[mod] >= stack.at(-1)) {
      stack.pop();
    }
    // res[mod] 被复写一轮的数据是没用的，有用的是 double 部分的单调栈信息
    if (stack.length) res[mod] = stack.at(-1);
    stack.push(nums[mod]);
  }

  return res;
};

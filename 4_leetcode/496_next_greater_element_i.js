// https://leetcode.cn/problems/next-greater-element-i/
// time O(n)

// version 1
// template
// time: 68ms
function _nextGreaterElement(list) {
  const res = [];
  const stack = [];

  for (let i = list.length - 1; i >= 0; i--) {
    while (stack.length && list[i] >= stack.at(-1)) {
      stack.pop();
    }
    res[i] = stack.length ? stack.at(-1) : -1;
    stack.push(list[i]);
  }

  return res;
}

var nextGreaterElement = function (nums1, nums2) {
  // 创建 map 减少 num1 在 num2 中每次遍历的时间
  const map = new Map();
  const list = _nextGreaterElement(nums2);

  for (let i = 0; i < nums2.length; i++) {
    map.set(nums2[i], list[i]);
  }

  return nums1.map((i) => map.get(i));
};

// version 2
// time: 64ms | beat 81%
var nextGreaterElement = function (nums1, nums2) {
  const stack = [];
  const record = {};

  nums2.forEach((num) => {
    while (stack.length && stack.at(-1) < num) {
      const key = stack.pop();
      record[key] = num;
    }
    stack.push(num);
  });
  return nums1.map((num) => {
    if (num in record) return record[num];
    else return -1;
  });
};

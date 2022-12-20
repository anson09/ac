// https://leetcode.cn/problems/reverse-string/

// 实现数组 reverse 方法
// space O(1)
var reverseString = function (s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]];
  }
};

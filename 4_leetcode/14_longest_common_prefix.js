// tags: #string

// https://leetcode.cn/problems/longest-common-prefix/

// time: 68ms | beat 56%
var longestCommonPrefix = function (strs) {
  let common = "";
  let pass = true;

  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 0; j < strs.length - 1; j++) {
      if (strs[j][i] !== strs[j + 1][i]) {
        pass = false;
        break;
      }
    }
    if (pass) common += strs[0][i];
    else break;
  }

  return common;
};

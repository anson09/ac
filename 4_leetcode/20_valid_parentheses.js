// tags: #stack #hot

// https://leetcode.cn/problems/valid-parentheses/

// time: O(n) | 52ms | beat 99%
function isValid(s) {
  const pair = { "(": ")", "{": "}", "[": "]" };
  const stack = [];
  for (let i of s) {
    if (Object.hasOwn(pair, i)) stack.push(i);
    else if (i !== pair[stack.pop()]) return false;
  }
  return !stack.length;
}

// tags: #sliding-window

// https://leetcode.cn/problems/longest-substring-without-repeating-characters/

// time: O(n) | 72ms | beat 91%
var lengthOfLongestSubstring = function (s) {
  let largest = 0;

  let start = 0;
  let end = 0;
  let set = new Set();

  while (end < s.length) {
    if (!set.has(s[end])) {
      set.add(s[end]);
      largest = Math.max(largest, set.size);
      end++;
    } else {
      while (set.has(s[end])) {
        set.delete(s[start]);
        start++;
      }
      set.add(s[end]);
      end++;
    }
  }

  return largest;
};

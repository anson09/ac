// tags: #dp #LIS

// https://leetcode.cn/problems/russian-doll-envelopes/

// time: O(n^2) | TLE
var maxEnvelopes = function (envelopes) {
  // w 从小到大排序，w 相同的根据 h 从大到小排序
  // 这个设计保证了从前往后遍历过程中 w 总是能满足信封嵌套，并让 LIS 算法选不到两个 w 相同的信封，就可以忽略 w 降为一维
  const h = envelopes
    .sort((a, b) => {
      if (a[0] === b[0]) return b[1] - a[1];
      else return a[0] - b[0];
    })
    .map((i) => i[1]);

  const dp = [1];
  for (let i = 1; i < h.length; i++) {
    let max = 0;
    for (let j = 0; j < dp.length; j++) {
      if (h[i] > h[j] && dp[j] > max) max = dp[j];
    }
    dp[i] = max + 1;
  }
  return Math.max(...dp);
};

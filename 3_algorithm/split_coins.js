/*
一堆硬币，面值可以是从1到500的任意整数，将他们分成两堆，求两堆面值总和的最小差值
比如 [3,4,5], 那么最小差值是 2
*/

// time O(2^n) Cn 0-n 的组合之和
// space O(n)
// 组合
function minDiff(arr) {
  const half = arr.reduce((a, b) => a + b) / 2;
  let max = 0;
  dfs(0);
  return (half - max) * 2;

  function dfs(idx, sum = 0) {
    for (let i = idx; i < arr.length; i++) {
      const tmpSum = sum + arr[i];
      if (tmpSum > half) continue;
      if (tmpSum > max) max = tmpSum;
      dfs(idx + 1, tmpSum);
    }
  }
}

/* test code */
console.assert(minDiff([3, 4, 5]) === 2);
console.assert(minDiff([8, 3, 4]) === 1);

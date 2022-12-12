/*
一堆硬币，面值可以是从1到500的任意整数，将他们分成两堆，求两堆面值总和的最小差值
比如 [3,4,5], 那么最小差值是 2
*/
function minDiff(arr) {
  const half = arr.reduce((a, b) => a + b) / 2;
  let max = 0;
  dfs(arr);
  return (half - max) * 2;

  function dfs(arr, sum = 0) {
    for (let i = 0; i < arr.length; i++) {
      const tmpArr = [...arr];
      const tmp = sum + arr[i];
      if (tmp > half) return;
      if (tmp > max) max = tmp;
      tmpArr.splice(i, 1);
      dfs(tmpArr, tmp);
    }
  }
}

/* test code */
console.assert(minDiff([3, 4, 5]) === 2);

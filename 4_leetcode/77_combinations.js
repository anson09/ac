// tags: #backtracking #combination

// https://leetcode.cn/problems/combinations/

// time: 268ms
var combine = function (n, k) {
  const result = [];
  const nums = [...Array(n)].map((_, idx) => idx + 1);
  dfs([], nums);
  return result;

  function dfs(select, options) {
    if (select.length === k) {
      result.push(select);
      return;
    }

    for (let i in options) {
      dfs([...select, options[i]], options.slice(Number(i) + 1));
    }
  }
};

// 排列每层都重头找，组合下层从上一层的下一个开始找
// time: 84ms | beat 91%
var combine = function (n, k) {
  const res = [];
  const path = []; // 任何时候只存在一条路

  dfs(1);

  function dfs(start) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }

    // 从 i <= n 剪枝
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }

  return res;
};

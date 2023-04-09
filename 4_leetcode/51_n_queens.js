// tags: #backtracking

// https://leetcode.cn/problems/n-queens/

// time: 76ms | beat 66%
var solveNQueens = function (n) {
  const rsp = [];
  const board = [...Array(n)].map(() => Array(n).fill("."));
  dfs(0);
  return rsp;

  function dfs(row) {
    if (row === n) {
      rsp.push(board.map((row) => row.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row][col] = "Q";
      dfs(row + 1);
      board[row][col] = ".";
    }
  }

  function isValid(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === "Q") return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === "Q") return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === "Q") return false;
    }
    return true;
  }
};

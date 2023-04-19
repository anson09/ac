// tags: #recursion #backtracking

// https://leetcode.cn/problems/path-sum/

// time: 68ms
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  let sum = 0;
  return dfs(root);

  function dfs(node) {
    if (!node.left && !node.right) {
      return sum + node.val === targetSum;
    }
    sum += node.val;
    if (node.left && dfs(node.left)) return true;
    if (node.right && dfs(node.right)) return true;
    sum -= node.val;
    return false;
  }
};

// time: 68ms | beat 74%
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === targetSum;
  targetSum -= root.val;
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};

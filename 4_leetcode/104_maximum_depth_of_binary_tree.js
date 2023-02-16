// https://leetcode.cn/problems/maximum-depth-of-binary-tree/

// version 1
// time: 72ms
// 分解问题的方式，动归思路
var maxDepth = function (root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// version 2
// time: 68ms | beat 62%
// 遍历的方式，回溯思路
var maxDepth = function (root) {
  let max = 0;
  let cur = 0;

  traverse(root);
  return max;

  function traverse(node) {
    if (!node) return;
    cur++; // 前序操作
    if (cur > max) max = cur; // 在 cur 加减内任意序操作
    traverse(node.left);
    traverse(node.right);
    cur--; // 后序操作
  }
};

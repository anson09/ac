// https://leetcode.cn/problems/binary-tree-preorder-traversal/

// 与常规遍历不同，用了原地分解问题思路
// time: 64ms | beat 42%
var preorderTraversal = function (root) {
  if (!root) return [];
  return [
    root.val,
    ...preorderTraversal(root.left),
    ...preorderTraversal(root.right),
  ];
};

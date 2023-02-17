// https://leetcode.cn/problems/diameter-of-binary-tree/

// time: 72ms | beat 51%
var diameterOfBinaryTree = function (root) {
  let max = 0;
  maxDepth(root);
  return max;

  function maxDepth(root) {
    if (root == null) {
      return 0;
    }
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    max = Math.max(max, left + right);
    return Math.max(left, right) + 1;
  }
};

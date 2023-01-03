// https://leetcode.cn/problems/balance-a-binary-search-tree/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */

function isValid(node) {
  function depth(root) {
    if (!root) return 0;
    let left = depth(root.left);
    if (left === -1) {
      return -1;
    }
    let right = depth(root.right);
    if (right === -1) {
      return -1;
    }
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
  if (depth(node) === -1) return false;
  return true;
}

function InOrder(root, list = []) {
  if (!root) return list;
  InOrder(root.left, list);
  list.push(root);
  InOrder(root.right, list);
  return list;
}

function build(list, root, side) {
  if (!list.length) return root;
  let mid = Math.floor(list.length / 2);
  if (!root) {
    root = list[mid];
  } else {
    root[side] = list[mid];
    root = root[side];
  }
  build(list.slice(0, mid), root, "left");
  build(list.slice(mid + 1, list.length), root, "right");
  return root;
}

var balanceBST = function (root) {
  if (isValid(root)) return root;

  const sortedList = InOrder(root).map((i) => {
    i.left = null;
    i.right = null;
    return i;
  });

  return build(sortedList);
};

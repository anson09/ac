// https://leetcode.cn/problems/balance-a-binary-search-tree/

// time: 116ms | beat 97%
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

function build(list, l, r) {
  if (l > r) return null;
  const mid = Math.floor((l + r) / 2);
  const root = list[mid];
  root.left = build(list, l, mid - 1);
  root.right = build(list, mid + 1, r);
  return root;
}

var balanceBST = function (root) {
  // if (isValid(root)) return root; 针对 lc 用例加检查会慢 20ms
  const sortedList = InOrder(root);
  return build(sortedList, 0, sortedList.length - 1);
};

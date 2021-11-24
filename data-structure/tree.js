const listGenetator = (number) =>
  new Array(number).fill(null).map((i) => Math.floor(Math.random() * 100));

class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

//* DFS思路 前中序、后中序可还原树，前后序信息不足
// 前中序还原二叉树
function restoreTree(preorder, inorder) {
  if (!preorder || preorder.length < 1) {
    return null;
  }
  const root = preorder[0];
  const treeNode = new Node(root);
  if (preorder.length === 1) {
    return treeNode;
  }

  let rootIndex = inorder.indexOf(root);
  let inLeftTree = inorder.slice(0, rootIndex);
  let preLeftTree = preorder.slice(1, inLeftTree.length + 1);
  let inRightTree = inorder.slice(rootIndex + 1, inorder.length);
  let preRightTree = preorder.slice(preLeftTree.length + 1, preorder.length);

  treeNode.left = restoreTree(preLeftTree, inLeftTree);
  treeNode.right = restoreTree(preRightTree, inRightTree);

  return treeNode;
}

// BFS思路建完全二叉树
function create(list) {
  const arr = [...list];
  const queue = [];
  const root = new Node(arr.shift());
  queue.push(root);
  while (arr.length) {
    const node = queue.shift();
    node.left = new Node(arr.shift());
    queue.push(node.left);
    if (arr.length) {
      node.right = new Node(arr.shift());
      queue.push(node.right);
    }
  }
  return root;
}

//* bfs dfs 本质区别是使用队列还是栈, 递归只是用了系统的栈
function bfs(root) {
  const visit = [];
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    visit.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return visit;
}

function dfsLoop(root) {
  const visit = [];
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    visit.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return visit;
}

function dfsPreOrder(root) {
  const visit = [];
  function traverse(node) {
    visit.push(node.val);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  traverse(root);
  return visit;
}

function depth(root) {
  if (!root) return 0;
  const leftDepth = depth(root.left);
  const rightDepth = depth(root.right);
  return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1;
}

function width(root) {
  const width = [];
  const queue = [];
  let count = 0;
  queue.push(root);
  root.layerLast = true;

  while (true) {
    const node = queue.shift();
    count++;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    if (node.layerLast) {
      width.push(count);
      count = 0;
      if (!queue.length) break;
      queue[queue.length - 1].layerLast = true;
    }
  }
  return width;
}

// 镜面反转二叉树
function rotate(root) {
  if (!root) return;
  let tmp = root.left;
  root.left = root.right;
  root.right = tmp;
  rotate(root.left);
  rotate(root.right);
}

// 获取两个结点间的路径
function route(root, node) {
  const path = [];

  function linkParent(root) {
    if (!root) return;
    if (root.left) {
      root.left.parent = root;
      linkParent(root.left);
    }
    if (root.right) {
      root.right.parent = root;
      linkParent(root.right);
    }
  }

  linkParent(root);
  while (node) {
    path.push(node);
    node = node.parent;
  }
  return path;
}

// test part
const assert = require("assert").strict;
const nodeCount = 20;
const list = listGenetator(nodeCount);
const tree = create(list);
assert.strictEqual(JSON.stringify(bfs(tree)), JSON.stringify(list));
assert.strictEqual(
  depth(tree),
  Math.ceil(Math.log(nodeCount + 1) / Math.log(2))
);
assert.strictEqual(
  JSON.stringify(dfsLoop(tree)),
  JSON.stringify(dfsPreOrder(tree))
);
assert.strictEqual(
  JSON.stringify(width(tree)),
  ((nodeCount) => {
    const list = [];
    let i = 0;
    while (nodeCount > 0) {
      const width = 2 ** list.length;
      if (nodeCount >= width) {
        nodeCount -= width;
        list.push(width);
      } else {
        list.push(nodeCount);
        break;
      }
      i++;
    }
    return JSON.stringify(list);
  })(nodeCount)
);

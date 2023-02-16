class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
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

// DFS思路 前中序、后中序可还原树，前后序信息不足
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

// BFS、DFS 本质区别是使用队列还是栈, 递归只是用了系统的栈
function bfs(root) {
  if (!root) return;
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

function dfsPreOrder(root) {
  const visit = [];
  function traverse(node) {
    if (!node) return;
    // 在刚进入节点时处理逻辑，这里的逻辑是简单的插入数组
    visit.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return visit;
}

function dfsInOrder(root) {
  const visit = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    // 在左子树遍历完，要开始遍历右子树时处理逻辑
    visit.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return visit;
}

function dfsPostOrder(root) {
  const visit = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    // 在将要离开节点时处理逻辑
    visit.push(node.val);
  }
  traverse(root);
  return visit;
}

function dfsPreOrderLoop(root) {
  const visit = [];
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    visit.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return visit;
}

function dfsInOrderLoop(root) {
  const visit = [];
  const stack = [];
  while (true) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    if (!stack.length) break;
    root = stack.pop();
    visit.push(root.val);
    root = root.right;
  }
  return visit;
}

function dfsPostOrderLoop(root) {
  const visit = [];
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    visit.push(node.val);
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return visit.reverse();
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
  [root.left, root.right] = [root.right, root.left];
  rotate(root.left);
  rotate(root.right);
}

// 通过构建反向连接，获取根结点到任意节点的路径
// 获得任意两条路径, 路径头部节点序列去重后连接上就是两节点的最短路, 头部开始最后一个相同节点就是两条连接的最近公共父亲
function routeByLink(root, end) {
  const path = [];

  function linkParent(node) {
    if (!node) return;
    if (node.left) {
      node.left.parent = node;
      linkParent(node.left);
    }
    if (node.right) {
      node.right.parent = node;
      linkParent(node.right);
    }
  }

  linkParent(root);
  while (end) {
    path.unshift(end);
    end = end.parent;
  }
  return path;
}

// 可优化为 routeByDFS 版本
function routeByStack(root, end) {
  const path = [];
  let found = false;

  function travel(root) {
    if (!root) return;
    path.push(root);
    if (root === end) found = true;
    if (!found) travel(root.left);
    if (!found) travel(root.right);
    if (!found) path.pop(root);
  }

  travel(root);
  return path;
}

// 获取根结点到任意节点的路径，找到终点后开始收敛
function routeByDFS(root, end) {
  return travel(root);

  function travel(node, path = []) {
    if (!node) return;
    // 前中后序皆可, 节点满足条件时才执行逻辑
    if (node === end) {
      // 基础深搜变形版本, 大部分算法都是基础版本变形
      // 深搜查找元素 找到后执行 return 停止本层后续查找, 同时 return 带出信息给上层使用
      path.unshift(node);
      return path;
    }

    // 收到 travel 内部 return 信息后停止后续递归逻辑, 一直传递到顶层, 若无信息 travel 拿到 undefined
    if (travel(node.left, path)) {
      path.unshift(node);
      return path;
    }

    if (travel(node.right, path)) {
      path.unshift(node);
      return path;
    }
  }
}

function lowestCommonAncestor(root, p, q) {
  // 当前信息足够可以返回结束
  if (root === null || root === p || root === q) {
    return root;
  }
  // 信息不足, 分别从左右子树收集信息
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  // 收集完信息后处理和返回
  if (left && right) {
    return root;
  }
  return left || right;
}

// 最低的一层，叶子节点不一定是
function isLastLayer(root, node) {
  return depth(root) === routeByDFS(root, node).length;
}

// 按满二叉树宽搜打印树内容，空节点补null
function bfsPrint(root) {
  let array = [];
  let queue = [];

  queue.push(root);

  while (queue.length) {
    const current = queue.shift();
    array.push(current.val);

    if (current.left) {
      queue.push(current.left);
    } else if (!isLastLayer(root, current)) {
      current.left = new Node();
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    } else if (!isLastLayer(root, current)) {
      current.right = new Node();
      queue.push(current.right);
    }
  }

  return array;
}

/* test code */
const assert = require("node:assert/strict");

const NODECOUNT = 20;
const listGenetator = (number) =>
  [...Array(number)].map(() => Math.floor(Math.random() * 100));
const list = listGenetator(NODECOUNT);
const tree = create(list);

// 层数
const treeDepth = Math.ceil(Math.log(NODECOUNT + 1) / Math.log(2));

// 每层宽度
const treeWidthList = ((nodeCount) => {
  const list = [];
  while (nodeCount > 0) {
    const width = 2 ** list.length;
    if (nodeCount >= width) {
      nodeCount -= width;
      list.push(width);
    } else {
      list.push(nodeCount);
      break;
    }
  }
  return list;
})(NODECOUNT);

// 生成随机叶子节点
const randomLeaf = ((root) => {
  while (true) {
    const direction = Math.random() > 0.5 ? "left" : "right";

    if (root[direction]) root = root[direction];
    else break;
  }
  return root;
})(tree);

assert.deepEqual(bfs(tree), list);

assert.deepEqual(dfsPreOrderLoop(tree), dfsPreOrder(tree));
assert.deepEqual(dfsInOrderLoop(tree), dfsInOrder(tree));
assert.deepEqual(dfsPostOrderLoop(tree), dfsPostOrder(tree));

assert.equal(depth(tree), treeDepth);
assert.deepEqual(width(tree), treeWidthList);

assert.deepEqual(
  routeByLink(tree, randomLeaf).map((i) => i.val),
  routeByStack(tree, randomLeaf).map((i) => i.val)
);
assert.deepEqual(
  routeByLink(tree, randomLeaf).map((i) => i.val),
  routeByDFS(tree, randomLeaf).map((i) => i.val)
);

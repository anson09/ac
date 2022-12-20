// 给出一个无序可有重复元素的数组，求数组中的所有满足其左边的数都小于它，右边的数都大于它的子元素

// verison 1
// time O(n^2)
function mid(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const left = arr.slice(0, i);
    const right = arr.slice(i + 1);
    if (Math.max(...left) < arr[i] && Math.min(...right) > arr[i]) {
      res.push(arr[i]);
    }
  }
  return res;
}

// version 2
// time O(n)
// 1. 构造后面没有更小元素的栈<单调栈上一个更小元素模版>
// 2. 构造前面没有更大元素的栈<单调栈下一个更大元素模版>
// 3. 计算两个栈交集
function _preSmallerElement(arr) {
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] <= arr[stack.at(-1)]) {
      stack.pop();
    }
    stack.push(i);
  }
  return stack;
}

function _nextLargerElement(arr) {
  const stack = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    while (stack.length && arr[i] >= arr[stack.at(-1)]) {
      stack.pop();
    }
    stack.push(i);
  }
  return stack;
}

function _union(arr1, arr2) {
  const res = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      res.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return res;
}

function mid(arr) {
  return _union(_preSmallerElement(arr), _nextLargerElement(arr).reverse()).map(
    (i) => arr[i]
  );
}

// version 3
// 继续简化上一个版本的常数遍历次数
function mid(arr) {
  let preMax = -Infinity;
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[i] <= stack.at(-1)) {
      stack.pop();
    }
    // 利用左侧最大值强化入栈规则
    if (arr[i] > preMax) {
      stack.push(arr[i]);
      preMax = arr[i];
    }
  }
  return stack;
}

/* test code */
const assert = require("node:assert/strict");
assert.deepEqual(mid([3, 1, 4, 0, 6, 5, 8, 9, 9, 14, 10, 15]), [8, 15]);

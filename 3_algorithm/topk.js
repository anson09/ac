// O(N)
function topk(arr, k) {
  if (arr.length <= k) return arr;
  const left = [];
  const right = [];
  pivot = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  if (left.length === k) return left;
  if (left.length === k - 1) return [...left, pivot];
  if (left.length < k)
    return [...left, pivot, ...topk(right, k - left.length - 1)];
  return topk(left, k);
}

// O(N) 计数排序
function topkLimited(arr, k) {
  if (k >= arr.length) return arr;

  const container = [];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (container[arr[i]]) {
      container[arr[i]] += 1;
    } else {
      container[arr[i]] = 1;
    }
  }

  for (let i = 0; i < container.length; i++) {
    while (container[i] > 0) {
      result.push(i);
      container[i]--;
      if (result.length === k) break;
    }
    if (result.length === k) break;
  }
  return result;
}

/* test code */
const assert = require("node:assert/strict");

function testRunner(f) {
  const list = [9, 3, 6, 1, 9, 0, 4, 7, 2, 5, 8, 5, 6];
  const K = 5;
  const topKList = f(list, K);
  assert.equal(topKList.length, K);
  topKList.forEach((i) => assert(i >= 0 && i <= 4));
}

testRunner(topk);
testRunner(topkLimited);

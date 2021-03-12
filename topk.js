// O(N)
function topk(arr, k) {
  if (arr.length <= k) return arr;
  let left = [],
    right = [];
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
function topkLimit(arr, k) {
  if (k >= arr.length) return arr;

  let container = [];
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (container[arr[i]]) {
      container[arr[i]] += 1;
    } else {
      container[arr[i]] = 1;
    }
  }

  for (let i = 0; i <= container.length; i++) {
    if (container[i]) {
      while (container[i] > 0) {
        result.push(i);
        container[i]--;
        k--;
        if (k === 0) break;
      }

      if (k === 0) break;
    }
  }
  return result;
}

const arr = [9, 3, 6, 1, 9, 0, 4, 7, 2, 5, 8, 5, 6];
console.log(topk(arr, 5));
console.log(topkLimit(arr, 5));

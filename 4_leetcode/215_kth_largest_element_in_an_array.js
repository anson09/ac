// https://leetcode.cn/problems/kth-largest-element-in-an-array/

// time: O(N)
// space: O(N) | JavaScript heap out of memory
var findKthLargest = function (nums, k) {
  if (k > nums.length) return null;
  const left = [];
  const right = [];
  const pivot = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] >= pivot) left.push(nums[i]);
    else right.push(nums[i]);
  }
  if (left.length === k - 1) return pivot;
  if (left.length >= k) return findKthLargest(left, k);
  return findKthLargest(right, k - left.length - 1);
};

// time: O(N) | 88ms | beat 88%
// space: O(logN)
var findKthLargest = function (nums, k) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // 第 k 大位置在 k-1，p 递归定位这个位置
    const p = partition(nums, left, right);
    if (p === k - 1) return nums[p];
    else if (p < k - 1) left = p + 1;
    else right = p - 1;
  }

  return null;

  function partition(arr, left, right) {
    const pivot = arr[left];
    let i = left + 1;
    let j = right;
    while (i <= j) {
      while (i < right && arr[i] >= pivot) i++;
      while (j > left && arr[j] < pivot) j--;
      if (i >= j) break;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    [arr[left], arr[j]] = [arr[j], arr[left]];
    return j;
  }
};

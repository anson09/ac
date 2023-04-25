// tags: #binary-search

// https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/

// time: 60ms | beat 75%
var searchRange = function (nums, target) {
  return bs(0, nums.length - 1);

  function bs(start, end) {
    if (start > end) return [-1, -1];
    let p = Math.floor((start + end) / 2);
    if (nums[p] === target) {
      let min = p;
      let max = p;
      while (nums[min - 1] === target) min--;
      while (nums[max + 1] === target) max++;
      return [min, max];
    } else if (nums[p] < target) return bs(p + 1, end);
    else return bs(start, p - 1);
  }
};

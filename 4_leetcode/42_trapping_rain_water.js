// tags: #two-pointers

// https://leetcode.cn/problems/trapping-rain-water/

// version 1
// time: O(n^2) | 3092ms
// space: O(n)
var trap = function (height) {
  let water = 0;
  for (let i = 0; i < height.length; i++) {
    water += Math.max(
      Math.min(
        Math.max(...height.slice(0, i)),
        Math.max(...height.slice(i + 1, height.length))
      ) - height[i],
      0
    );
  }
  return water;
};

// version 2
// 优化上一个版本的最大值搜索
// time: O(n) | 132ms
// space: O(n)
var trap = function (height) {
  let water = (leftMax = rightMax = 0);
  const leftMaxArr = [];
  const rightMaxArr = [];
  for (let i = 0; i < height.length; i++) {
    leftMax = Math.max(leftMax, height[i]);
    leftMaxArr.push(leftMax);
  }
  for (let i = height.length - 1; i >= 0; i--) {
    rightMax = Math.max(rightMax, height[i]);
    rightMaxArr.unshift(rightMax);
  }
  for (let i = 0; i < height.length; i++) {
    water += Math.max(Math.min(leftMaxArr[i], rightMaxArr[i]) - height[i], 0);
  }

  return water;
};

// version 3
// time: O(n) | 64ms | beat 88%
// space: O(1)
var trap = function (height) {
  let water = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  while (left <= right) {
    if (leftMax <= rightMax) {
      water += leftMax - height[left];
      leftMax = Math.max(leftMax, height[++left]);
    } else {
      water += rightMax - height[right];
      rightMax = Math.max(rightMax, height[--right]);
    }
  }
  return water;
};

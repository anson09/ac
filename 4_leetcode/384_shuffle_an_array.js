// https://leetcode.cn/problems/shuffle-an-array/

var Solution = function (nums) {
  this.nums = nums;
};

Solution.prototype.reset = function () {
  return this.nums;
};

// time: 152ms | beat: 48%
// Fisher–Yates shuffle 洗牌算法
Solution.prototype.shuffle = function () {
  const nums = this.nums.slice();
  for (let i = nums.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [nums[i], nums[rand]] = [nums[rand], nums[i]];
  }
  return nums;
};

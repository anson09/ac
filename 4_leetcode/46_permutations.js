// tags: #backtracking #permutation

// https://leetcode.cn/problems/permutations/

// time: O(n!) | 80ms | beat 33%
var permute = function (nums) {
  const result = [];
  const path = [];
  dfs();

  return result;

  function dfs() {
    // 比较 path.length 的长度来控制返回，返回条件决定了 P(m,n) 中 n 的深度，实际计算了 P(m,1)、P(m,2)、...、P(m,n) 的情况，这题中 n 等于 m
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 1. nums 里不剔除已经用过的元素，子任务每次费时间利用 path 的已知信息排除 nums 中用过的元素
      // 2. 也可直接向递归函数传入剔除掉用过元素的 nums 拷贝，这样费拷贝空间
      // 3. 优化拷贝空间的话可以利用回溯，原数组剔除用过的元素，下一步递归返回后把剔除掉的元素加回原位
      if (path.includes(nums[i])) continue;
      // path 和 nums 的 2/3 思路一样，这里用了 3
      path.push(nums[i]);
      dfs();
      path.pop();
    }
  }
};

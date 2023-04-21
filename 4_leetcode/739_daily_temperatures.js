// tags: #monotonic-stack

// https://leetcode.cn/problems/daily-temperatures/

// time: 288ms | beat 34%
var dailyTemperatures = function (temperatures) {
  const res = Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stack.length && temperatures[i] >= temperatures[stack.at(-1)]) {
      stack.pop();
    }

    if (stack.length) {
      res[i] = stack.at(-1) - i;
    }

    stack.push(i);
  }

  return res;
};

// tags: #dp

// https://leetcode.cn/problems/fibonacci-number/

// version 1
// time: O(2^n)
// space: O(n), because tree height is n, space is releasing then malloc when dfs traverse, occupied in meantime is depth at most
function fibonacci(i) {
  if (i === 0 || i === 1) return i;
  return fibonacci(i - 1) + fibonacci(i - 2);
}

// version 2
// use cache
// time: O(n)
// space: O(n)
function fibonacci(i, cache = [0, 1]) {
  if (cache[i] !== undefined) return cache[i];
  return (cache[i] = fibonacci(i - 1, cache) + fibonacci(i - 2, cache));
}

// version 3
// cache better
// time: O(n)
// space: O(n)
function fibonacci(i, a = 0, b = 1) {
  if (i === 0 || i === 1) return i;
  if (i === 2) return a + b;
  return fibonacci(i - 1, b, a + b);
}

// version 4
// cache best
// time: O(n) | 52ms | beat 96%
// space: O(1)
function fibonacci(i) {
  if (i === 0 || i === 1) return i;
  let a = 0;
  let b = 1;
  for (let j = 2; j <= i; j++) {
    [a, b] = [b, a + b];
  }
  return b;
}

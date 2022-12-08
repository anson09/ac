// time O(2^n) space O(n)
function fibonacci(i) {
  if (i === 0 || i === 1) return i;
  return fibonacci(i - 1) + fibonacci(i - 2);
}

// time O(n) space O(n)
function fibonacciCache(i, cache = [0, 1]) {
  if (cache[i] !== undefined) return cache[i];
  return (cache[i] =
    fibonacciCache(i - 1, cache) + fibonacciCache(i - 2, cache));
}

// time O(n) space O(n)
function fibonacciCacheBetter(i, a = 0, b = 1) {
  if (i === 0 || i === 1) return i;
  if (i === 2) return a + b;
  return fibonacciCacheBetter(i - 1, b, a + b);
}

// time O(n) space O(1)
function fibonacciCacheBest(i) {
  if (i === 0 || i === 1) return i;
  let a = 0;
  let b = 1;
  for (let j = 2; j <= i; j++) {
    [a, b] = [b, a + b];
  }
  return b;
}

//tag: #flat #hot

// 递归版本
function flattenByRecursion(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flattenByRecursion(next) : next);
  }, []);
}

// 循环版本
function flattenByLoop(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 控制层数版本
function flattenLimitedByLoop(arr, count) {
  while (arr.some((item) => Array.isArray(item) && count-- > 0)) {
    arr = [].concat(...arr);
  }
  return arr;
}

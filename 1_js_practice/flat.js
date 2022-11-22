// 递归版本
function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

// 循环版本
function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

// 控制层数版本
function flatten(arr, count) {
  while (arr.some((item) => Array.isArray(item) && count-- > 0)) {
    arr = [].concat(...arr);
  }
  return arr;
}

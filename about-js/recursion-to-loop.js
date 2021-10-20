// 递归爆栈转循环
function recursion2Loop(f) {
  var value;
  var active = false;
  var accumulated = [];

  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true;
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift());
      }
      active = false;
      return value;
    }
  };
}

const loopSum = recursion2Loop(function (x, y) {
  if (y > 0) {
    return loopSum(x + 1, y - 1);
  } else {
    return x;
  }
});

loopSum(1, 100000);

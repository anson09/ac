// 四则位运算

//* 时钟向后拨两个小时和向前拨10个小时是一样的，补码存在的意义就是让减法变成加法
//* 补码的补码等于源码 x = -(-x)

function plus(num1, num2) {
  if (num2 === 0) {
    return num1;
  }
  let sum = num1 ^ num2;
  let carry = (num1 & num2) << 1;
  return plus(sum, carry);
}

function minus(num1, num2) {
  let subtractor = plus(~num2, 1);
  return plus(num1, subtractor);
}

function multiply(num1, num2) {
  let num1Abs = num1 < 0 ? plus(~num1, 1) : num1;
  let num2Abs = num2 < 0 ? plus(~num2, 1) : num2;
  let count = 0;
  let result = 0;
  while (count < num2Abs) {
    result = plus(result, num1Abs);
    count = plus(count, 1);
  }
  if ((num1 ^ num2) < 0) {
    result = plus(~result, 1);
  }
  return result;
}

function divide(num1, num2) {
  let num1abs = num1 < 0 ? plus(~num1, 1) : num1;
  let num2abs = num2 < 0 ? plus(~num2, 1) : num2;
  let count = 0;
  let result = num1abs;
  while (result >= num2abs) {
    result = minus(result, num2abs);
    count = plus(count, 1);
  }
  if ((num1 ^ num2) < 0) {
    count = plus(~count, 1);
  }
  return count;
}

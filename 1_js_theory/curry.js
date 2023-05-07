// tags: #closure #hot

// implementing a currying function

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

/* test code */

const assert = require("node:assert/strict");

function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

assert.equal(curriedSum(1, 2, 3), 6);
assert.equal(curriedSum(1)(2, 3), 6);
assert.equal(curriedSum(1)(2)(3), 6);

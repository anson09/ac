// tags: #closure

function add(...rest1) {
  const _add = (...rest2) => add(...rest1, ...rest2);

  _add.value = () => rest1.reduce((pre, cur) => pre + cur);

  return _add;
}

/* test code */

const assert = require("node:assert/strict");

assert.equal(add(1)(2, 3)(4).value(), 10);

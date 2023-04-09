// tags: #string #regex

// writing a get function to pass test code below

// version 1
function get(obj, params) {
  return eval("obj." + params);
}

// version 2
function get(obj, params) {
  let rsp = obj;
  params.match(/\w/g).forEach((i) => {
    if (/\d/.test(i)) rsp = rsp[Number(i)];
    else rsp = rsp[i];
  });
  return rsp;
}

/* test code */
const assert = require("node:assert/strict");

var obj = {
  a: {
    b: [1, 2, 3, 4, 5],
  },
  c: "great",
};

assert.deepEqual(get(obj, "a.b"), [1, 2, 3, 4, 5]);
assert.equal(get(obj, "a.b[0]"), 1);
assert.equal(get(obj, "c"), "great");

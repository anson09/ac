// 输入是 1,2,3,5,7,8,10 输出要求是 1~3 5 7~8 10

function continuous(...args) {
  let out = "";
  let mark = false;
  for (let i = 0; i < args.length; i++) {
    out += args[i];

    while (i + 1 < args.length && args[i + 1] === args[i] + 1) {
      i++;
      mark = true;
    }
    if (mark === true) {
      mark = false;
      out = out + "~" + args[i];
    }
    out += " ";
  }

  return out.trim();
}

/* test code */

const assert = require("node:assert/strict");

assert.equal(continuous(1, 2, 3, 5, 7, 8, 10), "1~3 5 7~8 10");

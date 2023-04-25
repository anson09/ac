// tags: #string

// find the longest continuous string of numbers in the string

// version 1
function longestNumberString(str) {
  return str
    .match(/\d+/g)
    .reduce((pre, cur) => (pre.length > cur.length ? pre : cur));
}

// version 2
function isNumber(char) {
  return !Number.isNaN(Number(char));
}

function longestNumberString(str) {
  let start = -1;
  let max = "";
  for (let end = 0; end < str.length; end++) {
    if (isNumber(str[end])) {
      if (start === -1) {
        start = end;
      }
    } else {
      if (start !== -1) {
        const cur = str.slice(start, end);
        max = max.length > cur.length ? max : cur;
        start = -1;
      }
    }
  }
  return max;
}
/* test code*/
const assert = require("node:assert/strict");

assert.equal(
  longestNumberString("abcd12345ed125ss123456789aa123456"),
  "123456789"
);

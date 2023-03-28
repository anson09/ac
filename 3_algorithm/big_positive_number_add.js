// 大正数相加
// [link](../leetcode/415_add_strings.js)
function integerAdd(a, b) {
  const [sa, sb] = [a, b].map((i) => i.split("").map(Number).reverse());
  const [larger, smaller] = sa.length >= sb.length ? [sa, sb] : [sb, sa];

  return larger
    .reduce((prev, cur, idx) => {
      const carry = prev[idx] ? 1 : 0; // 进位
      const bitSum =
        idx < smaller.length ? cur + smaller[idx] + carry : cur + carry;
      prev[idx] = bitSum % 10;
      if (bitSum >= 10) prev[idx + 1] = 1;
      return prev;
    }, [])
    .reverse()
    .join("");
}

function add(a, b) {
  let [ai, ad] = a.split(".");
  let [bi, bd] = b.split(".");

  if (!ad && !bd) return integerAdd(ai, bi);
  if (!ad) return integerAdd(ai, bi) + "." + bd;
  if (!bd) return integerAdd(ai, bi) + "." + ad;

  const decimalLength = Math.max(ad.length, bd.length);
  let decimalSum = integerAdd(
    ad.padEnd(decimalLength, "0"),
    bd.padEnd(decimalLength, "0")
  );

  let carry = "0";
  if (decimalSum.length > decimalLength) {
    carry = "1";
    decimalSum = decimalSum.slice(1);
  }

  // 去除小数点尾部 0
  for (var i = decimalSum.length - 1; i >= 0; i--) {
    if (decimalSum[i] !== "0") break;
  }
  decimalSum = i === -1 ? "" : decimalSum.slice(0, i + 1);

  return (
    integerAdd(integerAdd(ai, bi), carry) + (decimalSum ? `.${decimalSum}` : "")
  );
}

/* test code */
const assert = require("node:assert/strict");

assert.equal(integerAdd("1", "9999"), integerAdd("10", "9990"));

assert.equal(add("1.001", "1.999"), "3");
assert.equal(add("0.1", "1.999"), "2.099");
assert.equal(add("111.001", "0.009"), "111.01");

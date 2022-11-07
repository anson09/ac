// 大正数相加
const assert = require("assert").strict;

function integerAdd(a, b) {
  const sa = a.split("").map(Number).reverse();
  const sb = b.split("").map(Number).reverse();
  let larger, smaller;
  if (sa.length > sb.length) {
    larger = sa;
    smaller = sb;
  } else {
    larger = sb;
    smaller = sa;
  }
  return larger
    .reduce((prev, cur, idx) => {
      // 进位
      const carry = prev[idx] ? 1 : 0;
      const bitSum =
        idx < smaller.length ? cur + smaller[idx] + carry : cur + carry;
      prev[idx] = bitSum % 10;
      if (bitSum >= 10) prev[idx + 1] = 1;
      return prev;
    }, [])
    .reverse()
    .join("");
}

assert.strictEqual(integerAdd("1", "9999"), integerAdd("10", "9990"));
console.log("integer pass");

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
  decimalSum = /(\d*)(?<=(?:^|[1-9]))0*/.exec(decimalSum)[1];
  return (
    integerAdd(integerAdd(ai, bi), carry) + (decimalSum ? `.${decimalSum}` : "")
  );
}

assert.strictEqual(add("1.001", "1.999"), "3");
assert.strictEqual(add("0.1", "1.999"), "2.099");
assert.strictEqual(add("111.001", "0.009"), "111.01");
console.log("float pass");

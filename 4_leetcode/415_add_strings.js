// https://leetcode.cn/problems/add-strings/

// time: 68ms | beat 68%
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

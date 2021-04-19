// 事件队列实现

//* 实现 batcher 函数
// const batcher = (f) => {

// };
const assert = require("assert").strict;

let executeCount = 0;

const fn = (nums) => {
  executeCount++;
  return nums.map((x) => x * 2);
};

const batchedFn = batcher(fn);

const main = async () => {
  const [r1, r2, r3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([7, 8, 9]),
  ]);

  assert.deepStrictEqual(r1, [2, 4, 6]);
  assert.deepStrictEqual(r2, [8, 10]);
  assert.deepStrictEqual(r3, [14, 16, 18]);
  assert.strictEqual(executeCount, 1);
  console.log("pass");
};

main();

function batcher(f) {
  let nums = [];

  const p = Promise.resolve().then(() => f(nums));

  return (arr) => {
    let s = nums.length;
    nums = nums.concat(arr);
    let e = nums.length;

    return p.then((r) => r.slice(s, e));
  };
}

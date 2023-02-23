// 利用 Promise 实现 Promise.all 方法

// for in -> 数组、字符串、对象
// for of(可迭代对象) -> 数组、字符串、Map、Set
// forEach -> 数组、Map、Set
Promise.all = function (arrLike) {
  // 参数需满足可迭代
  if (!arrLike[Symbol.iterator])
    return Promise.reject(new TypeError("not iterable"));
  return new Promise((resolve, reject) => {
    let count = 0;
    const res = [];
    const arr = Array.from(arrLike);
    if (!arr.length) resolve(res);
    arr.forEach((item, idx) => {
      Promise.resolve(item).then(
        (val) => {
          count++;
          res[idx] = val;
          if (count === arr.length) resolve(res);
        },
        (err) => reject(err)
      );
    });
  });
};

/* test code */
const test = require("node:test");
const assert = require("node:assert/strict");

const delay = (value, time, err) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) reject(err);
      else resolve(value);
    }, time);
  });

const p1 = delay(1, 1000);
const p2 = delay(2, 2000);
const p3 = delay(3, 3000);
const p4 = delay(2, 2000, "fail");

test("resolve", () =>
  Promise.all([p1(), p2(), p3()]).then((res) =>
    assert.deepEqual(res, [1, 2, 3])
  ));

test("reject", () =>
  Promise.all([p1(), p4(), p3()]).catch((err) => assert.equal(err, "fail")));

test("string", () =>
  Promise.all("123").then((res) => assert.deepEqual(res, ["1", "2", "3"])));

test("empty", () => Promise.all([]).then((res) => assert.deepEqual(res, [])));

test("error type", () =>
  Promise.all({}).catch((res) => assert.equal(res.message, "not iterable")));

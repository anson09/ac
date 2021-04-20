// implement promisify,将接受回调函数转换成返回 promise 的函数

/* callback interface */
function callback(err, data) {
  if (err) {
    console.log("err code:", err);
    return;
  }
  console.log(data);
}

// 回调写法
function querySuccessTest(name, age, callback) {
  console.log("do query 1");
  callback(0, { message: "ok" });
}
querySuccessTest("ricequant", 5, callback);

function queryFailTest(address, callback) {
  console.log("do query 2");
  callback(-1);
}
queryFailTest("SZ", callback);

// promise化后测试用例
promisify(querySuccessTest)("ricequant", 5)
  .then((rsp) => {
    console.log("1PASS");
  })
  .catch((err) => {
    console.log("1FAIL");
  });

promisify(queryFailTest)("SZ")
  .then((rsp) => {
    console.log("2FAIL");
  })
  .catch((err) => {
    console.log("2PASS");
  });

// 实现
function promisify(fn) {
  return (...args) => {
    return new Promise((res, rej) => {
      fn(...args, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
    });
  };
}

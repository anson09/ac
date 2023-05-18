// tags: #closure #async

function createFlow(arr) {
  const data = arr.flat(Infinity);
  data.run = async (cb) => {
    data.push(cb);
    for (let f of data) {
      await f();
    }
  };

  return data;
}

/* test code */
// 按照下面的测试用例，实现 createFlow:

// flow 是指一系列 effects 组成的逻辑片段
// flow 支持嵌套
// effects 的执行只需要支持串行
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

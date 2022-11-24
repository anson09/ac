// 宿主环境提供线程通信 postMessage(message) 和 addListener((message)=>{}) 方法，封装他们进行 rpc 通讯
// 调用方式 const res = await rpc('method', ...params);

function initRPC(postMessage, addListener) {
  let id = 0;
  const channelMap = new Map();

  function genId() {
    return id++;
  }

  function rpc(method, ...params) {
    const curId = genId();
    postMessage(
      JSON.stringify({
        id: curId,
        method,
        params,
      })
    );
    return new Promise((resolve, reject) => {
      channelMap.set(curId, {
        resolve,
        reject,
      });
    });
  }

  addListener((message) => {
    const { id, method, params, res } = JSON.parse(message);
    if (res) {
      const { resolve, reject } = channelMap.get(id);
      if (res.data) {
        resolve(res.data);
      } else {
        reject(res.error);
      }
      channelMap.delete(id);
    } else {
      try {
        const data = globalThis[method](...params);
        postMessage(
          JSON.stringify({
            id,
            res: {
              data,
            },
          })
        );
      } catch (e) {
        postMessage(
          JSON.stringify({
            id,
            res: {
              error: e.message,
            },
          })
        );
      }
    }
  });

  return rpc;
}

/* test code */

async function testRunner(fn) {
  const { Worker, isMainThread, parentPort } = require("node:worker_threads");

  if (isMainThread) {
    const worker = new Worker(__filename);

    globalThis.add = (a, b) => a + b;
    const rpc = fn(worker.postMessage.bind(worker), (cb) =>
      worker.on("message", cb)
    );

    console.log("parent thread(10-1):", await rpc("sub", 10, 1));
    console.log("parent thread(1-10):", await rpc("sub", 1, 10));
  } else {
    globalThis.sub = (a, b) => a - b;
    const rpc = fn(parentPort.postMessage.bind(parentPort), (cb) =>
      parentPort.on("message", cb)
    );

    console.log("child thread(1+2):", await rpc("add", 1, 2));
    console.log("child thread(2+3):", await rpc("add", 2, 3));
  }
}

testRunner(initRPC);

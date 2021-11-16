// 线程提供了 postMessage 和 addListener 方法，封装他们进行 rpc 通讯
// 调用方式 const res = await rpc('method', params);

let id = 0;
function genId() {
  return ++id;
}

const channelMap = new Map();

function rpc(method, params) {
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
  } else {
    try {
      const data = global[method](...params);
      postMessage({
        id,
        res: {
          data,
        },
      });
    } catch (e) {
      postMessage({
        id,
        res: {
          error: e.message,
        },
      });
    }
  }
});

// tags: #promise #callback

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

/* test code */
function testRunner(fn) {
  function query(arg, callback) {
    // callback arguments are (err, data)
    console.log("->", arg);

    if (arg) callback(null, { message: "ok" });
    else callback({ err: "params illegal" });
  }

  // callback style
  function myCallback(err, data) {
    if (err) console.log("x", err);
    else console.log("<-", data);
  }

  query(1, myCallback);
  query(null, myCallback);

  // promise style
  const pquery = fn(query);
  function chain(p) {
    p.then((data) => {
      console.log("<-", data);
    }).catch((err) => {
      console.log("x", err);
    });
  }
  chain(pquery(1));
  chain(pquery(null));
}

testRunner(promisify);

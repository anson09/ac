// tags: #promise #concurrence

/* 实现一个能够控制任务并发数量的函数 */
function limitedParallel(jobs, limit = 5) {
  let cursor = limit;
  jobs.slice(0, limit).forEach((job) => iterator(job));

  function iterator(job) {
    Promise.resolve(job()).finally(() => {
      if (cursor < jobs.length) {
        iterator(jobs[cursor++]);
      }
    });
  }
}

/* test code */
function testRunner(fn) {
  const job = (i) =>
    new Promise((resolve) => {
      console.log("->", i);
      setTimeout(() => {
        resolve();
        console.log("<-", i);
      }, Math.random() * 5000);
    });

  const jobs = [...Array(30)].map((_, i) => () => job(i));
  fn(jobs);
}

testRunner(limitedParallel);

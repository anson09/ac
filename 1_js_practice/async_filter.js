/* map version */
const asyncFilterByMap = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
};

/* reduce version - concurrently */
const asyncFilterConcurrentlyByReduce = async (arr, predicate) =>
  arr.reduce(
    async (memo, e) => ((await predicate(e)) ? [...(await memo), e] : memo),
    []
  );

/* reduce version - sequentially */
const asyncFilterSequentiallyByReduce = async (arr, predicate) =>
  arr.reduce(
    async (memo, e) => [...(await memo), ...((await predicate(e)) ? [e] : [])],
    []
  );

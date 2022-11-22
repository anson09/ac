function reverse(promise) {
  return new Promise((resolve, reject) =>
    Promise.resolve(promise).then(reject, resolve)
  );
}

function promiseAny(iterable) {
  return reverse(Promise.all([...iterable].map(reverse)));
}

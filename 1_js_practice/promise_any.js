function _reverse(promise) {
  return new Promise((resolve, reject) =>
    Promise.resolve(promise).then(reject, resolve)
  );
}

function promiseAny(iterable) {
  return _reverse(Promise.all([...iterable].map(_reverse)));
}

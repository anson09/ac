// tags: #prototype

function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.call(obj, ...args);
  return result instanceof Object ? result : obj;
}

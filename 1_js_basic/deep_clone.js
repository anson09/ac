function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }

  return cloneObj;
}

/* test code */
function testRunner(fn) {
  const obj = { reg: /\w+/, prop: { number: 100 } };
  obj.self = obj;

  const clone = fn(obj);
  clone.prop.number++;

  console.log(obj, clone);
}

testRunner(deepClone);

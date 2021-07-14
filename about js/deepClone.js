function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.get(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

const obj = { name: /\w+/, address: { x: 100 } };
obj.o = obj;
const clone = deepClone(obj);
obj.address.x = 200;
console.log(obj, clone);

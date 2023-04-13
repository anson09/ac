// Rewriting Object's toString method，print object to console in flat style like below

const obj = {
  foo: "test",
  bar: {
    id: 35,
    name: "uu",
    age: [20, 40],
    company: { name: "CSC", rank: 1 },
  },
};

Object.prototype.toString = function (prefix = "") {
  for (let key in this) {
    if (typeof this[key] !== "object" || Array.isArray(this[key])) {
      if (Array.isArray(this[key])) {
        for (let idx in this[key]) {
          console.log(`${prefix}${key}.${idx}=${this[key][idx]}`);
        }
      } else {
        console.log(`${prefix}${key}=${this[key]}`);
      }
    } else {
      Object.prototype.toString.call(this[key], `${prefix}${key}.`);
    }
  }
};

obj.toString();

/* output:
  foo=test
  bar.id=35
  bar.name=tx
  bar.age.0=20
  bar.age.1=40
  bar.company.name=CSC
  bar.company.rank=1
  */

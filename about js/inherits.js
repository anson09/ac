// implement following function

// function inherits(Child, Parent) {}

// test context
function Staff(props) {
  this.name = props.name || "Unnamed";
}

function Engineer(props) {
  Staff.call(this, props);
  this.language = props.language || "js";
}

inherits(Engineer, Staff);

var alice = new Engineer({
  name: "Alice",
  language: "js",
});

console.log(alice.__proto__ === Engineer.prototype);
console.log(alice.__proto__.__proto__ === Staff.prototype);
console.log(alice instanceof Engineer);
console.log(alice instanceof Staff);
console.log(alice.constructor === Engineer);

/*****/
function inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

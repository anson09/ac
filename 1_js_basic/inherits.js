// test code
function testRunner(fn) {
  function Staff(props) {
    this.name = props.name || "Unnamed";
  }

  function Engineer(props) {
    Staff.call(this, props);
    this.language = props.language || "js";
  }

  fn(Engineer, Staff);

  var alice = new Engineer({
    name: "Alice",
    language: "rust",
  });

  console.log(alice instanceof Engineer); // alice.__proto__ === Engineer.prototype
  console.log(alice instanceof Staff); // alice.__proto__.__proto__ === Staff.prototype
  console.log(alice.constructor === Engineer);
}

testRunner(inherits);

/*****/
function inherits(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

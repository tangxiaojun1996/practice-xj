
function myNew(fn) {
  const foo = {};
  foo.__proto__ = fn.prototype;
  fn.apply(foo);
  return foo;
}

function son() {
  this.a = 1
  this.b = 2
}

const a = myNew(son)
console.log(a)
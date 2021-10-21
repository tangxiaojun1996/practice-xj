const { extra } = require("./extra");

function add(a, b) {
  console.log("enter add", extra);
  return a + b;
}

module.exports = add;

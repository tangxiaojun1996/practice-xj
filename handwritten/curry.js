function curry(fn) {
  let arrs = []
  return function temp(...args) {
    arrs.push(...args)
    if (arrs.length >= fn.length) {
      return fn.call(this, ...arrs)
    } else {
      return (...args2) => temp(...args2)
    }
  }
}

function test(a, b, c) {
  return a + b + c
}

const testFn = curry(test)
console.log(testFn(1, 4)(2, 3, 4, 5,))

7  1  5  3  6  4
0  0  4  2  5  3

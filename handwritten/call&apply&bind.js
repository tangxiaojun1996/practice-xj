/**
 * 改变this指向
 * 调用目标函数
 * 第二个及以后均为目标函数参数
 */
Function.prototype.myCall = function (thisObj, ...restArgs) {
  // thisObj.__call__ = this; // 这里的this就是foo函数本身
  Object.defineProperty(thisObj, '__call__', { // 上面一行的优化写法，防止在原函数上打印的this多了一个__call__属性
    enumerable: false,
    value: this
  })
  thisObj.__call__(...restArgs); // 使用thisObj执行这个函数，就自动改变了this的指向
  delete thisObj.__call__; // 最后删掉
  console.log(thisObj);
}

function foo(a1, a2) {
  console.log('执行', a1, a2, this)
}


// foo.myCall({ name: 'llz' }, 'param1', 'param2');


Function.prototype.myBind = function (thisObj, ...restArgs) {
  const temp = this
  return (...args) => {
    temp.myCall(thisObj, ...restArgs, ...args)
  }
}

function test(a, b) {
  console.log(a, b, this)
}

const test1 = test.myBind({ a: 1 }, 4)
test1(2)
// test.call({ cc: 1 }, 1, 2);
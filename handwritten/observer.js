
function Observer() {
  this.eventMap = {
    // 'scroll': [fn1, fm2]
  }
}


Observer.prototype.on = function (event, callback) {
  // 注册
  if (this.eventMap[event]) {
    this.eventMap[event].push(callback);
  } else {
    this.eventMap[event] = [callback];
  }
  return () => this.cancel(event, callback);
}

Observer.prototype.emit = async function (event, data) {
  // 触发
  const fnList = this.eventMap[event];
  if (fnList && fnList.length) {
    for (let i = 0; i < fnList.length; i++) {
      await fnList[i](data)
    }


    // fnList.forEach(async fn => {
    //   await fn(data);
    // })
  }
}

Observer.prototype.cancel = function (event, fn) {
  const fnList = this.eventMap[event];
  for (let i = 0; i < fnList.length; i++) {
    const curFn = fnList[i];
    if (curFn === fn) {
      this.eventMap[event].splice(i, 1);
    }
  }
}

const o = new Observer();
const cancelOn1 = o.on('test', async (data) => {
  await console.log('1  start', data)
  await new Promise(rs => setTimeout(rs, 3000));
  await console.log('1 end', data)
});
o.on('test', (data) => {
  console.log('2 start', data)
  console.log('2 end', data)
});

o.on('test', async (data) => {
  await console.log('3 start', data)
  await new Promise(rs => setTimeout(rs, 3000));
  await console.log('3 end', data)
});

cancelOn1();

o.emit('test', 'i m testing!');
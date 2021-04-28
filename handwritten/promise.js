/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

// [Promises/A+ 标准](https://promisesaplus.com/)

function Promise(executor) {
  this.status = 'pending';
  this.value = undefined;
  this.reason = undefined;
  this.fn1Callback = [];
  this.fn2Callback = [];

  console.log('enter my promise!');

  const resolve = (value) => {
    setTimeout(() => {
      this.status = 'resolved';
      this.value = value;
      this.fn1Callback.forEach((cb) => cb(value));
    }, 0);
  };

  const reject = (reason) => {
    setTimeout(() => {
      this.status = 'rejected';
      this.reason = reason;
      this.fn2Callback.forEach((cb) => cb(reason));
    }, 0);
  };

  executor(resolve, reject);
}

const resolvePromise = (data, resolve, reject) => {
  if (data instanceof Promise) {
    return data.then((d) => resolve(d), (e) => reject(e));
  }
  if (typeof data === 'function') {
    const { then } = data; // thenable
    then.call(data, (d2) => resolvePromise(d2, resolve, reject), (r) => {
      reject(r);
    });
  } else {
    resolve(data);
  }
};

Promise.prototype.then = function (fn1, fn2) {
  if (this.status === 'resolved') {
    return new Promise((resolve, reject) => {
      const data = fn1(this.value);
      // resolve(data);
      resolvePromise(data, resolve, reject);
    });
  }
  if (this.status === 'rejected') {
    return new Promise((resolve, reject) => {
      const reason = fn2(this.value);
      reject(reason);
    });
  }
  if (this.status === 'pending') {
    return new Promise((resolve, reject) => {
      this.fn1Callback.push(() => {
        const data = fn1(this.value);
        // resolve(data);
        resolvePromise(data, resolve, reject);
      });
      this.fn2Callback.push(() => {
        const reason = fn2(this.reason);
        reject(reason);
      });
    });
  }
};

Promise.prototype.catch = function (reject) {
  return this.then(null, reject);
};

Promise.prototype.resolve = function (value) {
  return new Promise((rs) => rs(value));
};

Promise.prototype.reject = function (reason) {
  return new Promise((rj) => rj(reason));
};

Promise.prototype.all = function (...promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let sum = 0;
    for (let i = 0; i < promises.length; i += 1) {
      const promise = promises[i];
      // eslint-disable-next-line no-loop-func
      promise.then((data) => {
        result[i] = data;
        sum += 1;
        if (sum === promises.length) {
          return resolve(result);
        }
      }).catch((reason) => reject(reason));
    }
  });
};

Promise.prototype.race = function (...promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i += 1) {
      const promise = promises[i];
      promise.then(resolve, reject);
    }
  });
};

Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (reason) => Promise.resolve(callback()).then(() => { throw reason; }),
  );
};

// 测试
new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 500);
}).then((res) => {
  console.log(res);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 500);
  });
}).then((res) => {
  console.log(res);
  throw new Error('a error');
}).catch((err) => { // todo try catch
  console.log('==>', err);
});

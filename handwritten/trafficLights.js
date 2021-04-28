/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
// 我们现在要实现一个红绿灯，把一个圆形 div 按照绿色 3 秒，黄色 1 秒，红色 2 秒循环改变背景色

const sleep = (time, value) => new Promise((rs) => {
  setTimeout(() => {
    rs(value);
    console.log('value', value);
  }, time);
});

// 貌似会爆栈, 还是下面的while好点
const lightController = async () => {
  await sleep(3000, 'red');
  await sleep(1000, 'yellow');
  await sleep(2000, 'green');
  lightController();
};

const lightController2 = async () => {
  while (true) {
    await sleep(3000, 'red');
    await sleep(1000, 'yellow');
    await sleep(2000, 'green');
  }
};

lightController();

// lightController2();

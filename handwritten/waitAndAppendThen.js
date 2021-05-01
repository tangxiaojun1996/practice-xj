/* eslint-disable no-await-in-loop */
const sleep = async (time) => new Promise((resolve) => setTimeout(resolve, time));

const repeat = async (times, interval, fn) => {
  let curTimes = 0;
  const p = new Promise((resolve) => {
    curTimes += 1;
    fn();
    resolve();
  });
  while (curTimes < times) {
    await sleep(interval);
    p.then(fn);
    curTimes += 1;
  }
};

repeat(4, 2000, () => {
  console.log('hello');
});

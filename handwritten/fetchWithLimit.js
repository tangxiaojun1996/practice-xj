/* eslint-disable no-loop-func */
const fetchWithLimit = (limit, promises) => new Promise((resolve) => {
  // curIndex 当前开始执行的任务索引; finishIndex 已完成的index; curCount 当前处理的任务数
  let curIndex = 0; let finishIndex = 0; let curCount = 0;

  function run() {
    if (finishIndex >= promises.length) {
      resolve('finish!');
      return;
    }

    while (curCount < limit && curIndex < promises.length) { // 执行下一个任务
      promises[curIndex]().finally(() => {
        finishIndex += 1;
        curCount -= 1;
        run();
      });
      curIndex += 1;
      curCount += 1;
    }
  }

  run();
});

const startTime = new Date().getTime();

const sleep = (time, value) => () => new Promise((res) => setTimeout(() => {
  console.log('sleep res', value, new Date().getTime() - startTime);
  res();
}, time));

fetchWithLimit(3, [sleep(3000, 1), sleep(1000, 2), sleep(4000, 3), sleep(5000, 4)]).then((data) => {
  console.log('then data', data);
});

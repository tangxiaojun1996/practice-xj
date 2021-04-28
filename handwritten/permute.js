/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */

// 全排列

const permute = function (nums) {
  const result = [];
  const curItem = [];

  const dfs = () => {
    if (curItem.length === nums.length) {
      result.push([...curItem]);
      return;
    }

    for (const n of nums) {
      if (curItem.includes(n)) continue;
      curItem.push(n);
      dfs(curItem);
      // 回溯 因为上一步退出递归到这一步的时候，就可以pop掉上次最后push的记录，然后可能会退出多个递归，所以可以pop掉好几个并回到相对外层;
      // 再到下一次最外层的循环的时候，n又加1了；所以比方原来的[1,2,3]，会因为递归了2次而pop两次变成[1]，但是下次进入循环体n对应的值就是3了
      curItem.pop();
    }
  };

  dfs();

  return result;
};

console.log(permute([1, 2, 3]));

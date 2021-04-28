var letterCombinations = function (digits) {
  if (!digits || !digits.length) return [];

  const obj = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  const arrs = []
  digits.split('').forEach(v => {
    arrs.push(obj[v])
  })

  // console.log(arrs)

  let result = arrs.splice(0, 1)[0];
  console.log('arrs', arrs);
  while (arrs.length > 0) {
    const res = [];
    result.forEach((v1) => {
      arrs[0].forEach(v2 => {
        console.log('v1 v2', v1, v2);
        res.push(`${v1}${v2}`);
      })
    })
    arrs.splice(0, 1);
    result = res;
  }
  console.log('result', result);
  return result;

  // arrs.forEach(arr=>{
  //     arr.forEach(strArr=>{

  //     })
  // })
};

letterCombinations('234')
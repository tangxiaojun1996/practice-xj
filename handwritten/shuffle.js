/* eslint-disable for-direction */
const shuffle = (arr) => {
  const result = [...arr];

  for (let i = result.length - 1; i >= 0; i -= 1) {
    const randomIndex = Math.round(Math.random() * i);
    [result[i], result[randomIndex]] = [result[randomIndex], result[i]];
  }
  return result;
};

console.log(shuffle([1, 2, 3, 4, 5, 6, 7]));

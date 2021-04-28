
const flat = (arr) => {
	return arr.reduce((r, a) =>  r.concat(Array.isArray(a) ? flat(a) : a), []);
}

const arr = [1,[2,[3,[4], [5,6]], [7]],8];

console.log(flat(arr));
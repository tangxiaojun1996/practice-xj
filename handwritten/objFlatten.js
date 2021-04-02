

const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }

const objectFlat = (obj, preKey = '') => {
	return Object.keys(obj).reduce((result, key) => {
		const value = obj[key];
		const isObj = typeof value === 'object';
		const newKey = preKey ? `${preKey}.${key}` : key;

		return isObj ? {...result, ...objectFlat(value, newKey)} : {...result, [newKey]: value};
	}, {});

}

console.log(objectFlat(source));
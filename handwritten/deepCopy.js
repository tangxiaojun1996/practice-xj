
const deepCopy = (obj, cache = new WeakMap()) => {

	if (cache.get(obj)) return obj;
	
	const result = Array.isArray(obj) ? [] : {};

	cache.set(obj, 1); // 缓存obj的引用，防止循环引用

	 // 支持函数
	 if (obj instanceof Function) {
		 function newFn() {
			obj.apply(this, arguments)
		 }
		 newFn.__proto__ === obj.__proto__; // 原型链上也要拷贝
		 return newFn;
  }
  // 支持日期
  if (obj instanceof Date) return new Date(obj);

	// 还可以支持其他对象，如正则

	for(let key in obj) {
		const value = obj[key];
		result[key] = typeof value === 'object' ? deepCopy(value, cache) : value;
	}
	
	return result;
}


console.log(deepCopy({
	name: 'txj',
	hobby: ['lol', 'music', {name: 'coding'}],
}));

// 测试
const source = {
  name: 'Jack',
  meta: {
    age: 12,
    birth: new Date('1997-10-10'),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log('Hello');
    }
  }
}
source.source = source
const newObj = deepCopy(source)
console.log(newObj.meta.ary[2] === source.meta.ary[2]);

function Parent () {
	this.type = 'parent';
}

Parent.prototype.say = function () {
	console.log('parent say hello');
}


// 盗用构造继承
// 缺点：继承不了原型链上的方法
{
	function Child() {
		Parent.call(this);
	}
	const c = new Child();
	console.log({c, 'c.type': c.type, 'c.say': c.say});
}

// 类式继承
// 缺点：1.父类引用属性可能被修改;2. 实例化时无法传递参数(只有子类继承的那一次才可以手动传一次)
{
	function Child() {
		
	}
	Child.prototype = new Parent();
	const c = new Child();
	console.log({c, 'c.type': c.type, 'c.say': c.say});
}

// 组合继承 (构造 + 原型)
// 缺点: 父类构造函数会执行两次
{
	function Child() {
		Parent.call(this);
	}
	Child.prototype = new Parent(); // 父类构造函数要执行两次
	const c = new Child();
	console.log({c, 'c.type': c.type, 'c.say': c.say});
}

// 原型式继承
// 缺点: 和「类式继承」有相同问题
{
	function inherit (o) {
		const F = new Function;
		F.prototype = o;
		return new F();
	}
	function Child() {
		this.childProp = 'childProp';
	}
	const c = inherit(Parent);
	console.log({c, 'c.type': c.type, 'c.say': c.say});
}

// 寄生式继承
// 实质只是在原型式基础上拓展属性，问题还在
{
	function parasitic (o) {
		const child = inherit(o);
		child.childProp1 = 'cp1';
		child.prototype.cf = () => console.log('cf');
		return child;
	}
	const c = parasitic(Parent);
	console.log({c, 'c.type': c.type, 'c.say': c.say});
}

// 寄生式组合继承
{
	function inheritPrototype(subClass, superClass){
		// 复制一份父类的原型副本保存在变量中
		var p = inherit(superClass.prototype);
		// 修正因为重写子类原型导致子类的constructor属性被修改
		p.constructor = subClass;
		// 设置子类的原型
		subClass.prototype = p;
	}

	// 定义子类
	function Child(){
		// 构造函数式继承
		Parent.call(this);
		// 子类新增属性
		this.time = 'time';
	}

	// 寄生式继承父类原型
	inheritPrototype(Child, Parent);

	const c = new Child();
	console.log('寄生式组合继承', c, c.__proto__)

}
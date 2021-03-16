
function myInstanceof (source, target) {
	let proto = source.__proto__;
	while(proto) {
		if (proto === target.prototype){
			return true;
		} else {
			proto = proto.__proto__;
		}
	}

	return false;

}

const o = new Object();

console.log(myInstanceof(o, Object));

class Parent {}
class Child extends Parent {}
const child = new Child()
console.log(isInstanceOf(child, Parent), isInstanceOf(child, Child), isInstanceOf(child, Array))
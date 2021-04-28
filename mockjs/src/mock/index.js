// 使用 Mock
import Mock from 'mockjs';
var listData = Mock.mock({
		// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
		'list|1-10': [{
				// 属性 id 是一个自增数，起始值为 1，每次增 1
				'id|+1': 1,
				'name|5-10': 'qwe'
		}]
})


Mock.mock('/api/getUsers', 'get', (options) => {
	console.log('options', options);
	return {
			data: true,
			code: 0,
			message:'get success'
	}
})

Mock.mock('/api/updateUsers', 'post', (options) => {
	console.log('options', options);
	return {
			data: true,
			code: 0,
			message:'update success'
	}
})


export default {listData}
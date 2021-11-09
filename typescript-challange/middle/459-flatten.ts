/*
  459 - Flatten
  -------
  by zhouyiming (@chbro) #中等 #array
  
  ### 题目
  
  In this challenge, you would need to write a type that takes an array and emitted the flatten array type.
  
  For example:
  
  ```ts
  type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
  ```
  
  > 在 Github 上查看：https://tsch.js.org/459/zh-CN
*/


/* _____________ 你的代码 _____________ */
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest] ? [...(First extends any[] ? Flatten<First> : [First]), ...Flatten<Rest>] : [];
// 重点：先判断第一个是否为数组，是的话递归判断，直到它递归到不是一个数组后将这个值放在数组里面

/*
  之前的解答：
  type Flatten<T extends any[], U extends any[] = []> = { [key in keyof T]: T[key] extends any[] ? Flatten<T[key], U> : U[key]  }

  当时的问题点：不知道怎么遍历T的同时，往U中塞数据
  看答案后：其实不需要声明一个U来收集结果，只需解构和递归即可达到效果
*/

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{foo: 'bar'; 2: 10}, 'foobar']>, [{foo: 'bar'; 2: 10}, 'foobar']>>,
]



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/459/answer/zh-CN
  > 查看解答：https://tsch.js.org/459/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/


/*
  898 - Includes
  -------
  by null (@kynefuk) #简单 #array
  
  ### 题目
  
  在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。
  
  举例来说，
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
  
  > 在 Github 上查看：https://tsch.js.org/898/zh-CN
*/


/* _____________ 你的代码 _____________ */
type Includes<U extends any[], T> = U extends [infer R, ...infer F] ? Equal<R, T> extends true ? true : Includes<F, T> : false
// 重点：Includes递归数组，每次都取其中第一个(infer R)，并依次判断是否与传入的T相等

// 也可以：
// type Includes<T extends readonly any[], U> = { [K in keyof T]: Equal<T[K], U> extends true ? true : never }[number] extends never ? false : true;
// 重点：遍历T的key，判断其value和U是否相等，最后得到的结果对象中只要有true的结果，即符合要求

/* _____________ 测试用例 _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi','Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
]



/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/898/answer/zh-CN
  > 查看解答：https://tsch.js.org/898/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/


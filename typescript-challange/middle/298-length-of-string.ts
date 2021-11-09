/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal
  
  ### Question
  
  Compute the length of a string literal, which behaves like `String#length`.
  
  > View on GitHub: https://tsch.js.org/298
*/


/* _____________ Your Code Here _____________ */
type LengthOfString<S extends string, T extends any[] = []> = S extends `${infer K}${infer R}` ? LengthOfString<R, [...T, K]> : T['length']
// 重点：string类型直接T['length']的话得到的是number；要将其类型转化为数组，这样T['length']就可以直接得到数组的长度了
// 另外：ts类似这种需要另外有个变量空间来存储数据的情况，一般就再开一个泛型就好，但记得要赋初始值

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/


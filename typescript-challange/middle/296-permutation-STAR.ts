/*
  296 - Permutation
  -------
  by Naoto Ikuno (@pandanoir) #medium #union
  
  ### Question
  
  Implement permutation type that transforms union types into the array that includes permutations of unions.
  
  ```typescript
  type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
  ```
  
  > View on GitHub: https://tsch.js.org/296
*/


/* _____________ Your Code Here _____________ */
type Permutation<T, U = T> = [U] extends [never] 
  ? [] 
  : T extends never
    ? []
    : [T, ...Permutation<Exclude<U, T>>]

/* 
  注意：核心就是这段代码 [T, ...Permutation<Exclude<U, T>>]；
  实际上就是利用了联合类型的三元判断会自动进行遍历，同时全排列算法中的 include 判断直接使用 Exclude<U, T> 达到效果，递归子数组即可实现。有点牛的。

  执行分析：
  假设开始是abc，T是a，U是abc，[a, P<bc>]
    进入递归bc，由于bc是联合类型，也会遍历
    开始遍历的时候是[b, P<c>]，后面遍历到c，得到的就是[c, P<b>]
    所以a的情况就得到了[a,b,c],[a,c,b]
  同理遍历到b，Exclude b 后是ac，然后再次进入上述递归流程
  同时对边缘情况(递归终止条件)做一下判断
  最后即可得到全排列
  
*/


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<never>, []>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/


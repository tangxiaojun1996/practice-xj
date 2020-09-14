import React, { useState } from 'react';

const Example = () => {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(5);
  console.log('useState', useState);
  console.log('count', count);
  console.log('setCount', setCount);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Example;
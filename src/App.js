import { useState } from 'react';
import './App.css';
import styles from './App.module.css';

function Counter() {
  // state 값을 변경시키면 화면은 다시 렌더링된다!
  const [refresh, setRefresh] = useState(true);
  console.log("Counter 다시 생성");

  // let count = 0;
  // 지역변수로 count가 설정되어있어서 다시 렌더링되면 count가 초기화 되기 때문에 화면상에 숫자가 계속 0
  const [count, setCount] = useState(0);

  const onClick = () => {
    // count = count + 1;

    // 이전의 값을 콜백함수에 매개변수로 표현
    setRefresh(prev => !prev);

    setCount(prev => prev + 1);
  }
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

function App() {
  return (
    <div className={styles.App}>
      <Counter />
    </div>
  );
}

export default App;

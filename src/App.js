import { useEffect, useState } from 'react';
import './App.css';
import styles from './App.module.css';

const Toc = (props) => {
  return (
    <ul>
      {
        props.list.map((v, i) => {
          return <li key={i}>{v.title}</li>;
        })
      }
    </ul>
  );
};

function Counter() {
  // state 값을 변경시키면 화면은 다시 렌더링된다!
  const [refresh, setRefresh] = useState(true);
  console.log("Counter 다시 생성"); // 어느 상황이든지 항상 출력됨

  // let count = 0;
  // 지역변수로 count가 설정되어있어서 다시 렌더링되면 count가 초기화 되기 때문에 화면상에 숫자가 계속 0
  const [count, setCount] = useState(0);

  const [color, setColor] = useState('red');

  const [list, setList] = useState([]);

  const getData = async () => {
    const res = await fetch('http://ggoreb.com/api/toc.jsp');
    const data = await res.json();
    setList(data);
  };

  useEffect(() => {
    console.log("최초 동작"); // 최초 실행될때만 출력됨
    getData();
  }, []); // = Mount

  useEffect(() => {
    console.log("다시 렌더링"); // 최초 실행될때, 값이 수정될때마다 출력됨
  }, [count]); // [count]:deps // count 값이 변화할때마다 콜백함수 실행됨 // = Update

  useEffect(() => {
    console.log(`Counter 컴포넌트 생성, color 값 변경 될 때 실행`);
  }, [color]);

  useEffect(() => {
    return () => {
      console.log(`Counter 컴포넌트 제거`);
    }
  }, []); // = UnMount

  const onClick = () => {
    // count = count + 1;

    // 이전의 값을 콜백함수에 매개변수로 표현
    setRefresh(prev => !prev);

    setCount(prev => prev + 1);
  }

  const onClick2 = () => {
    setColor('blue');
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onClick}>Click</button>
      <button onClick={onClick2}>Click</button>
      <hr />
      <Toc list={list} />
    </div>
  )
}

function App() {
  const [hide, setHide] = useState(false);
  const onClick = () => {
    setHide(!hide);
  };
  return (
    <div className={styles.App}>
      <button onClick={onClick}>Show / Hide</button>
      {
        !hide ? <Counter /> : null
      }
    </div>
  );
}

export default App;

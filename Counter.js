function MyButton({ text, handleClick }) {
  return React.createElement('button', { className:'btn btn-sm btn-info',onClick: handleClick }, text);
}
const initialState = { reductCount: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { reductCount: state.reductCount + 1 };
    case 'decrement':
      return { reductCount: state.reductCount - 1 };
    default:
      throw new Error();
  }
}
export default function Counter() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const [count, setCount] = React.useState(0);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [opacity, setOpacity] = React.useState(1.0);
  let countInterval = null;
  React.useEffect(() => {
    // 执行只在组件挂载时运行一次的操作 设置副作用
    const print = (v) => console.log(v);
    countInterval = setInterval(() => {
      setCount(prev => { print(prev + 1); return prev + 1; });
      setOpacity(prev => { prev -= .05; if (prev < 0.1) prev = 1.0; return prev; });
    }, 300);//state异步更新,函数组件setSomething参数传回调函数及时取最新值
    console.log('React.useEffect setInterval');
    return () => {
      clearInterval(countInterval);
      console.log('React.useEffect clearInterval');
      // 在组件卸载前执行清理操作
    };
  }, []);
  // React.useEffect(() => {
  // 当 props.name 改变时，执行操作
  //}, [props.name]);
  return React.createElement(
    'div', { style: { opacity: opacity } },
    'Count: ',
    count,
    React.createElement(MyButton, { text: 'Increment', handleClick: () => dispatch({ type: 'increment' }) }),
    React.createElement(MyButton, { text: 'Decrement', handleClick: () => dispatch({ type: 'decrement' }) }),
    state.reductCount,
  );
}

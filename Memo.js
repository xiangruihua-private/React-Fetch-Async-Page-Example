const ChildComponent = React.memo(({ onClick, count }) => {
  console.log('Rendering ChildComponent');
  return React.createElement('button', { onClick: onClick }, 'Count: ', count);
});
// React.memo 非常适用于以下场景：
// 静态数据展示：组件接收的 props 很少变化，但组件本身较为复杂，重新渲染成本高。
// 性能优化：在大列表或表格中，每个项目都是独立的组件，使用 React.memo 可以避免不必要的重新渲染。
// 避免深度相等检查：自定义比较函数可以避免深度相等检查，特别是在 props 包含大量数据时。

// 浅比较：默认情况下，React.memo 进行浅比较，这意味着它只会比较 props 的一级内容，嵌套对象需要自定义比较函数。
// 状态和上下文：React.memo 只关注 props 的变化，组件内部的状态和上下文的变化不会触发重新渲染。

// React.memo：用于记忆化整个组件，优化组件的渲染。
// useMemo：用于记忆化函数组件内部的值或计算结果。
// useCallback：用于记忆化函数组件内部的回调函数，避免不必要的重新创建
export default function Memo() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const [count, setCount] = React.useState(0);

  const increment = React.useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const doubledCount = React.useMemo(() => count * 2, [count]);

  return React.createElement('div', null,
    React.createElement('p', null, 'Doubled Count: ', doubledCount),
    React.createElement(ChildComponent, { onClick: increment, count: count }),
    React.createElement('button', { className:'btn btn-sm btn-info',onClick: increment }, 'Increment')
  );
}
// useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, 和 useImperativeHandle
// useContext - 用于访问 React context 在组件树中传递的数据，而不必通过每个组件传递 props。
// const value = useContext(MyContext);
// useReducer - 用于更复杂的 state 逻辑，它接收一个 reducer 函数和初始状态，然后返回当前的状态和派发 action 的 dispatch 函数。
// const [state, dispatch] = useReducer(reducer, initialState);
// useCallback - 用于返回一个 memoized 版本的回调函数，防止不必要的渲染。
// useMemo - 用于对计算结果进行记忆，避免在每次渲染时重复计算。
// useRef - 用于创建对 DOM 元素或值的引用，可以在渲染之间保持状态
// useImperativeHandle - 用于使用 ref 时暴露 DOM 元素的方法。
//useImperativeHandle(ref, () => ({ // 暴露的方法 }));
// useLayoutEffect - 与 useEffect 类似，但它在所有的 DOM 变更之后同步执行。这在需要读取 DOM 布局并同步触发重渲染时非常有用。
// useLayoutEffect(() => { // 副作用操作 }, [dependencies]);
// useDebugValue - 用于在 React 开发者工具中显示自定义 hook 的标签。

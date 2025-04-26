import { useStore,StoreProvider } from './store/ContextStore.js';

function Counter() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const { state, dispatch } = useStore();

  return React.createElement('div', null,
    'Context Count: ',
    state.count,
    React.createElement('button', { className:'btn',onClick: () => dispatch({ type: 'increment' }) }, '+'),
    React.createElement('button', { className:'btn',onClick: () => dispatch({ type: 'decrement' }) }, '-')
  );
}
export default function ContextReducer() {
  return React.createElement(StoreProvider, null,
    React.createElement(Counter, null)
  )
}

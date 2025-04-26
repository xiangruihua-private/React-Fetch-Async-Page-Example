// 初始状态
const initialState = { count: 0 };

// Reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
const store = Redux.createStore(counterReducer);

function Counter() {
  const count = ReactRedux.useSelector(state => state.count);
  const dispatch = ReactRedux.useDispatch();
  const { t, i18n } = ReactI18next.useTranslation('Counter');

  return React.createElement('div', null,
    `Redux ${t('计数器')}:  `,
    count,
    React.createElement('button', { className: 'btn', onClick: () => dispatch({ type: 'INCREMENT' }) }, '+'),
    React.createElement('button', { className: 'btn', onClick: () => dispatch({ type: 'DECREMENT' }) }, '-')
  );
}
export default function ReduxReducer() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  return React.createElement(ReactRedux.Provider, { store: store },
    React.createElement(Counter, null)
  )
}
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const StoreContext = React.createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return React.createElement(StoreContext.Provider, { value: { state, dispatch } },
    children
  );
}

export function useStore() {
  return React.useContext(StoreContext);
}
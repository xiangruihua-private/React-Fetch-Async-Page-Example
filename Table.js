export default function Table() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  return React.createElement('div', { className: 'overflow-x-auto' },
    React.createElement('table', { className: 'table' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null),
          React.createElement('th', null, 'Name'),
          React.createElement('th', null, 'Job'),
          React.createElement('th', null, 'Favorite Color')
        )
      ),
      React.createElement('tbody', null,
        Array.from([1, 2, 3]).map(i => React.createElement('tr', { key: i },
          React.createElement('th', null, i),
          React.createElement('td', null, `Name ${i}`),
          React.createElement('td', null, `Job ${i}`),
          React.createElement('td', null, `Color ${i}`)
        ))
      )
    ),
    React.createElement('div', { className: 'join' },
      React.createElement('button', { className: 'join-item btn' }, '1'),
      React.createElement('button', { className: 'join-item btn' }, '2'),
      React.createElement('button', { className: 'join-item btn btn-disabled' }, '...'),
      React.createElement('button', { className: 'join-item btn' }, '99'),
      React.createElement('button', { className: 'join-item btn' }, '100')
    )
  );
}

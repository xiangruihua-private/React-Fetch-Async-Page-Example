export default function Hello() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0'
  };

  const titleStyle = {
    fontSize: '24px',
    color: '#333'
  };
  return React.createElement('div', {style: containerStyle},
    React.createElement('h1', {style: titleStyle}, 'Hello World!')
  );
}

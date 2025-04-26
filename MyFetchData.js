export default function MyFetchData() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const inputRef = React.useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data'); // 替换为你的 API 地址
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return React.createElement('div', null, 'Loading...');
  }

  return React.createElement(
    'div', null,
    React.createElement('div', null,
      React.createElement('input', { type: 'text', className: 'input input-sm input-info', ref: inputRef }),
      React.createElement('button', { className: 'btn btn-sm btn-info', onClick: handleClick }, 'Focus Input')
    ),
    React.createElement('h1', null, 'Data from API:'),
    React.createElement('pre', null, JSON.stringify(data, null, 2))
  );
};

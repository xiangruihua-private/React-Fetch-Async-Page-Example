export default function UIExample() {
  const { pathname } = ReactRouterDOM.useLocation();
  React.useEffect(() => {
    AppContext.setCurrentMenu(pathname);
  }, []);
  return React.createElement('div', {
    className: `
      p-4 md:p-8
      max-w-4xl mx-auto
      bg-base-100
    `
  },
    React.createElement('h1', {
      className: `
        text-2xl md:text-4xl
        font-bold
        text-primary
        mb-6
      `
    }, "Tailwind + DaisyUI CDN示例"),

    React.createElement('div', {
      className: `
        grid grid-cols-1 md:grid-cols-2
        gap-4
      `
    },
      React.createElement('div', {
        className: `
          card bg-base-200
          shadow-lg
          transition-all hover:shadow-xl
        `
      },
        React.createElement('div', { className: 'card-body' },
          React.createElement('h2', { className: 'card-title' }, "响应式卡片"),
          React.createElement('p', null, "在移动设备上单列显示，桌面设备双列显示"),
          React.createElement('div', { className: 'card-actions justify-end' },
            React.createElement('button', {
              className: 'btn btn-primary btn-sm md:btn-md',
              onClick: () => alert('按钮点击')
            }, "点击我")
          )
        )
      )
    )
  )
}
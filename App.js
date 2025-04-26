class BasePage extends React.Component {
  constructor (props) {
    super(props);
    AppContext.setCurrentMenu(props.location.pathname);
    console.log('Page 挂载阶段 constructor');
  }
}
const AppContext = {
  MenuRoutes: [],
  setCurrentMenu: function(path) {
    let { menu } = this.MenuRoutes.find(item => item.path === path) || { path: '/', menu: 'Home' };
    document.getElementById('cur-path').innerText = menu;
  },
}

const NavBar = () => {
  const { t,i18n } = ReactI18next.useTranslation();
  return React.createElement('div',{className:'navbar bg-base-100 shadow-sm'},
    React.createElement('div',{className:'flex-none'},
      React.createElement('button',{className:'btn btn-square btn-ghost'},
        React.createElement('i',{className:'fas fa-home'})
      )
    ),
    React.createElement('div',{className:'flex-1'},
      React.createElement('a',{className:'btn btn-ghost text-xl'},t('ReactTitle',{name: t('Lab')}) )
    ),
    React.createElement('div', {className:'breadcrumbs text-sm flex-1'},
      React.createElement('ul',null,
        React.createElement('li',{key:'Home'},React.createElement('a',{to:'/'},"Home")),
        React.createElement('li',{key:'curr',id:'cur-path'},'')
      )
    ),
    React.createElement('div', {
      className: 'flex flex-wrap'
    },
      React.createElement('select', {
        className: 'select select-sm w-full max-w-xs',
        onChange: (e) => i18n.changeLanguage(e.target.value)
      },
        React.createElement('option', { key:'zh',value: 'zh' }, "简体中文"),
        React.createElement('option', { key:'en',value: 'en' }, "English")
      )
    ),
    React.createElement('div', {
      className: 'flex flex-wrap'
    },
      React.createElement('select', {
        className: 'select select-sm w-full max-w-xs',
        onChange: (e) => document.documentElement.setAttribute('data-theme', e.target.value)
      },
        React.createElement('option', { key:'light',value: 'light' }, "Light主题"),
        React.createElement('option', { key:'dark',value: 'dark' }, "Dark主题"),
        React.createElement('option', { key:'cupcake',value: 'cupcake' }, "Cupcake主题")
      )
    ),
    React.createElement('div',{className:'dropdown dropdown-end'},
      React.createElement('div',{tabIndex:'0',className:'btn btn-ghost btn-circle avatar'},
        React.createElement('div',{className:'w-10 rounded-full'},
          React.createElement('img',{src:'React-Fetch-Async-Page-Example/assets/png/xiang-smile.png'})
        ),
      ),
      React.createElement('ul',{tabIndex:'0',className:'menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'},
        React.createElement('li',null,
          React.createElement('a',{className:'justify-between'},
            'Profile',
            React.createElement('span',{className:'badge'},'New')
          )
        ),
        React.createElement('li',null,React.createElement('a',null,'Settings')),
        React.createElement('li',null,React.createElement('a',null,'Logout'))
      ),
    ),
    React.createElement('div',{className:'flex-none'},
      React.createElement('button',{className:'btn btn-square btn-ghost'},
        React.createElement('i',{className:'fa-solid fa-ellipsis-vertical'})
      )
    )
  );
}
const MenuRoutesView = ({MenuRoutes}) => {
  const menus = [], routes = [];
  MenuRoutes.forEach((item) => {
    menus.push(React.createElement('li',{key:item.path},React.createElement(ReactRouterDOM.Link,{to:item.path,meta:{menu:item.menu}},item.menu)));
    if (item.fetchPath) {
      routes.push(React.createElement(ReactRouterDOM.Route,{path:item.path,component:React.lazy(() => import(item.fetchPath))}));
    }
  });
  return React.createElement(
    ReactRouterDOM.HashRouter,null,
    React.createElement('div',{className:'flex flex-1'},
      React.createElement('div',{className:'w-64 bg-base-200 p-4 hidden md:block'},
        React.createElement('ul',{className:'menu'},
          ...menus
        ),
      ),
      React.createElement(
        'div',{className:'flex-1 p-6'},
        React.createElement(
          React.Suspense,{fallback: React.createElement('div',null,'Loading...')},
          React.createElement(ReactRouterDOM.Switch,null,
            ...routes
          )
        ),
      ),
    ),
  );
}
const loadMenuRoutes = async () => {
  let res = await axios.get('React-Fetch-Async-Page-Example/MenuRoutes.json');
  return res.data;
}
const fetchLocale = async (locale) => await import(`React-Fetch-Async-Page-Example/locale/${locale}.js`);
Promise.all([ loadMenuRoutes(),fetchLocale('zh'),fetchLocale('en')])
  .then(([ MenuRoutes,zhMsg,enMsg]) => {
    AppContext.MenuRoutes = MenuRoutes;
    initApp(MenuRoutes,{ zh: zhMsg.default, en: enMsg.default });
  }).catch(err => {
    console.log('err: ', err);
  });
const initApp = (MenuRoutes, messages) => {
  i18next
    .use(ReactI18next.initReactI18next)
    .init({
      resources:messages,
      lng: "zh",
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });
  const App = ({MenuRoutes}) => {
    return React.createElement('div',{className:'min-h-screen flex flex-col'},
      React.createElement(NavBar,null),
      React.createElement(MenuRoutesView,{MenuRoutes}),
    );
  };
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(App,{MenuRoutes}));

}
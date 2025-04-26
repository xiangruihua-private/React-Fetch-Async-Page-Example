const HelloWho = React.memo(({name}) => {
  return React.createElement('h1',null,'Hello,',name,'!');
}, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});
function FormattedDate(props) {
  return React.createElement(
    'h2', null,
    '现在是 ', props.date.toLocaleTimeString(), '.'
  );
}
class Clock extends BasePage {
  constructor (props) { // 挂载阶段
    super(props);
    this.state = { date: new Date() };
    console.log('Clock 挂载阶段 constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) { // 挂载/更新阶段 每次在调用 render 方法之前调用，用于更新状态
    console.log('挂载/更新阶段 getDerivedStateFromProps');
    if (nextProps.reset) {
      return { date: new Date() };
    }
    return null;
  }
  // render在下面 渲染组件的 UI

  componentDidMount() { // 组件挂载后调用，此时可以进行 DOM 操作或数据请求
    console.log('挂载阶段 componentDidMount');
    this.timerID = setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  shouldComponentUpdate(nextProps, nextState) { // 更新阶段 返回布尔值，决定组件是否重新渲染
    console.log('更新阶段 shouldComponentUpdate');
    return nextState.date !== this.state.date;
  }

  // render在下面 渲染组件的 UI

  getSnapshotBeforeUpdate(prevProps, prevState) { // 更新阶段 在 DOM 更新之前调用，用于捕获一些信息（如滚动位置）
    console.log('更新阶段 getSnapshotBeforeUpdate');
    return { scrollPosition: window.scrollY };
  }

  componentDidUpdate(prevProps, prevState, snapshot) { // 更新阶段 在组件更新后调用
    console.log('更新阶段 componentDidUpdate');
    if (snapshot) {
      window.scrollTo(0, snapshot.scrollPosition);
    }
  }

  componentWillUnmount() { // 卸载阶段 组件即将卸载时调用，用于清理资源（如定时器、事件监听等）
    console.log('卸载阶段 componentWillUnmount')
    clearInterval(this.timerID);
  }

  render() {
    console.log('render');
    return React.createElement(
      'div', null,
      React.createElement(HelloWho, { name: 'XRH' }),
      React.createElement(FormattedDate, { date: this.state.date }),
    );
  }
}
export default ReactRouterDOM.withRouter(Clock);
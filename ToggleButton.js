function WarningBanner(props) {
  if (!props.warn) {
    return null; // 让 render 方法返回 null阻止渲染但不影响该组件生命周期方法回调
  }
  return React.createElement(
    'div', { className: 'warning' },
    '警告!',
  );
}

class ToggleButton extends BasePage {
  constructor (props) {
    super(props);
    this.state = { showWarning: true }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }), () => { console.log(this.state.showWarning); }); //state异步更新,类组件setState第二个参数回调及时取最新值
  }

  render() {
    return React.createElement(
      'div', null,
      React.createElement(WarningBanner, { warn: this.state.showWarning }),
      React.createElement('button', { className:'btn btn-sm btn-info', onClick: this.handleToggleClick }, this.state.showWarning ? '隐藏' : '显示')
    );
  }
}
export default ReactRouterDOM.withRouter(ToggleButton);
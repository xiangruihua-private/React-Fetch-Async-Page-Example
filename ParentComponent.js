class ChildComponent extends React.Component {
  changeBgColor = () => {
    this.inputRef.current.style.backgroundColor = 'yellow'; // 直接修改 DOM 元素的样式
  };

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus(); // 组件挂载后自动聚焦输入框
  }

  render() {
    return React.createElement('input',{ type: 'text',className:'input input-sm',ref: this.inputRef},null);
  }
}
// 创建 Refs：在类组件中使用 React.createRef，在函数组件中使用 useRef Hook。
// 访问 DOM 元素：通过 refs 直接访问并操作 DOM 元素。
// 访问子组件实例：通过 refs 访问子组件的实例方法或属性。
// 自定义暴露的实例值：使用 useImperativeHandle 和 forwardRef 自定义子组件暴露给父组件的实例值。
// 并发模式中的 Refs：Refs 在并发模式中依然正常工作，可以与 useTransition 等并发模式相关的 Hook 结合使用
class ParentComponent extends BasePage {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
  }

  handleClick = () => {
    this.childRef.current.changeBgColor();
  };

  render() {
    // return (
    //   <div>
    //     <ChildComponent ref={this.childRef} />
    //     <button onClick={this.handleClick}>Change Child</button>
    //   </div>
    // );
    return React.createElement(
      'div',
      null,
      React.createElement(ChildComponent, { ref: this.childRef }, null),
      React.createElement(
        'button',
        { className:'btn btn-sm btn-info', onClick: this.handleClick },
        'Change Child'
      )
    );
  }
}
export default ReactRouterDOM.withRouter(ParentComponent);
class MyForm extends BasePage {
  constructor (props) {
    super(props);
    this.state = { input: '', select: '', check: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted value:', this.state.input, this.state.select, this.state.check);
  };

  render() {
    return React.createElement(
      'form', { onSubmit: this.handleSubmit },
      React.createElement('input', { type: 'text', className:'input input-sm input-info', name: 'input', value: this.state.input, onChange: this.handleChange }),
      React.createElement('label', null,
        '选择您最喜欢的网站',
        React.createElement('select', { value: this.state.select,className:'select select-sm select-info', name: 'select', onChange: this.handleChange },
          React.createElement('option', { value: 'Google' }, 'Google'),
          React.createElement('option', { value: 'Runoob' }, 'Runoob'),
          React.createElement('option', { value: 'Taobao' }, 'Taobao'),
          React.createElement('option', { value: 'Facebook' }, 'Facebook')
        )
      ),
      React.createElement('input', {
        name: 'check',
        type: 'checkbox',
        className:'checkbox checkbox-sm checkbox-info',
        checked: this.state.check,
        onChange: this.handleChange
      }),
      React.createElement('button', { type: 'submit',className:'btn btn-sm btn-info' }, 'Submit')
    );
  }
}
export default ReactRouterDOM.withRouter(MyForm);
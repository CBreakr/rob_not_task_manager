
import React from "react";

class RegisterForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email:"",
      password:""
    };
  }

  updateInput = (evt) => {
    const value = evt.target.value;

    const newState = {...this.state};

    newState[evt.target.name] = value;

    this.setState(newState);
  }

  register = (evt) => {
    evt.preventDefault();
    this.props.register(this.state);

    this.setState({
      email:"",
      password:""
    });
  }

  render() {
    return (
      <div className="register_form">
        <form onSubmit={this.register}>
          <div>
            <input type="text" name="email" placeholder="email" onChange={this.updateInput} />
          </div>
          <div>
            <input type="password" name="password" placeholder="password" onChange={this.updateInput} />
          </div>
          <input type="submit" className="confirm_button" value="register" />
        </form>
      </div>
    );
  }
}

export default RegisterForm;

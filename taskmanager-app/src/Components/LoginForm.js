
import React from "react";

class LoginForm extends React.Component {

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

  login = (evt) => {
    evt.preventDefault();
    console.log("login state", {user:this.state});
    this.props.login(this.state);

    this.setState({
      email:"",
      password:""
    });
  }

  render() {
    return (
      <div className="login_form">
        <form onSubmit={this.login}>
          <div>
            <input type="text" name="email" placeholder="email" onChange={this.updateInput} />
          </div>
          <div>
            <input type="password" name="password" placeholder="password" onChange={this.updateInput} />
          </div>
          <input type="submit" className="confirm_button" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

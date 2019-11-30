
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
      <div>
        <form onSubmit={this.login}>
          <input type="text" name="email" placeholder="email" onChange={this.updateInput} />
          <br />
          <input type="password" name="password" placeholder="password" onChange={this.updateInput} />
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;

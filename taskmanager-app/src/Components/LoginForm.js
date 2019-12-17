
import React from "react";

/*
  form for taking in a user email and password
  to be authenticated against the DB
  in order to start a session
*/

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email:"",
      password:""
    };
  }

  //
  // set the state value based on input name
  //
  updateInput = (evt) => {
    const value = evt.target.value;
    const newState = {...this.state};
    newState[evt.target.name] = value;

    this.setState(newState);
  }

  //
  // call the login method and then clear the state
  //
  login = (evt) => {
    evt.preventDefault();
    this.props.login(this.state);

    this.setState({
      email:"",
      password:""
    });
  }

  //
  // RENDER
  //
  render() {
    return (
      <div className="login_form">
        <form onSubmit={this.login}>
          <div>
            <input type="text"
              name="email"
              placeholder="email"
              onChange={this.updateInput} />
          </div>
          <div>
            <input type="password"
              name="password"
              placeholder="password"
              onChange={this.updateInput} />
          </div>
          <input type="submit"
            className="confirm_button"
            value="Login" />
        </form>
      </div>
    );
  }
}

//
// EXPORT
//
export default LoginForm;

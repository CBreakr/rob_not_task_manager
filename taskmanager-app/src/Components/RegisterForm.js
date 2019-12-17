
import React from "react";

/*
  form for taking in the user email and password
  of a new user to be created
*/

class RegisterForm extends React.Component {

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
  // call the register method and then clear the state
  //
  register = (evt) => {
    evt.preventDefault();
    this.props.register(this.state);

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
      <div className="register_form">
        <form onSubmit={this.register}>
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
            value="register" />
        </form>
      </div>
    );
  }
}

//
// EXPORT
//
export default RegisterForm;

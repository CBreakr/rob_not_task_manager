
import React from "react";

/*
  element to display current user
  and provide option to log out of their session

  props expected:
  - email
*/

class Logout extends React.Component {

  logout = (evt) => {
    this.props.logout();
  }

  //
  // RENDER
  //
  render(){
    return (
      <span className="logout_form">
        <span>
          {this.props.email}
        </span>
        <input type="button"
          className="reject_button logout_button"
          value="Logout"
          onClick={this.logout} />
      </span>
    )
  }
}

//
// EXPORT
//
export default Logout;

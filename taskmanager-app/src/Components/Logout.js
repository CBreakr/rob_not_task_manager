
import React from "react";

class Logout extends React.Component {

  logout = (evt) => {
    this.props.logout();
  }

  render(){
    return (
      <span className="logout_form">
        <span>
          {this.props.email}
        </span>
        <input type="button" className="reject_button" value="Logout" onClick={this.logout} />
      </span>
    )
  }
}

export default Logout;

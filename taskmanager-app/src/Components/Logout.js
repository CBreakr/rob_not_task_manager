
import React from "react";

class Logout extends React.Component {

  logout = (evt) => {
    this.props.logout();
  }

  render(){
    return (
      <div>
        <span>
          {this.props.email}
        </span>
        <input type="button" value="Logout" onClick={this.logout} />
      </div>
    )
  }
}

export default Logout;


import React from "react";

import DropDown from "../DropDown";

const accessLevelList = [
  "read",
  "create/edit",
  "admin"
];

class ProjectAccessForm extends React.Component {

  constructor(){
    super();
    this.state = {
      foundUser: null,
      userEmail:"",
      accessLevel:"read"
    };
  }

  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  findUserByEmail = (evt) => {
    console.log("FORM: find user by email", this.state.userEmail);
    evt.preventDefault();
    if(this.state.userEmail){
      this.props.findUser(this.state.userEmail, this.setUser);
    }
  }

  setUser = (user) => {
    console.log("did we get a user back?", {user});
    this.setState({
      ...this.state,
      foundUser:user
    });
  }

  setUserAccess = (evt) => {
    console.log("FORM: set user access", {user:this.state.foundUser, level:this.state.accessLevel});
    evt.preventDefault();
    if(this.state.foundUser && this.state.accessLevel){
      this.props.setUserAccess(this.props.currentProject, this.state.foundUser, this.state.accessLevel);

      // clear the input
      this.setState({
        foundUser: null,
        userEmail:"",
        accessLevel:""
      });

      if(this.props.onComplete){
        this.props.onComplete();
      }
    }
  }

  render() {

    let foundUser = "";
    let userEmail = "";
    let accessLevel = "";

    if(this.state){
      if(this.state.foundUser){
        foundUser = this.state.foundUser;
      }

      if(this.state.userEmail){
        userEmail = this.state.userEmail;
      }

      if(this.state.accessLevel){
        accessLevel = this.state.accessLevel;
      }
    }

    return (
      <div>
        <form onSubmit={this.findUserByEmail}>
          <input type="text" name="userEmail" value={userEmail} placeholder="email to find" onChange={this.updateInput} />
          <br />
          <input type="submit" value="Find User" />
        </form>
        {
          foundUser
          ? <form onSubmit={this.setUserAccess}>
              Access Level:
              <DropDown
                name="accessLevel"
                valueList={accessLevelList}
                currentValue={accessLevel}
                updateInput={this.updateInput}
              />
              <br />
              <input type="submit" value="Set Access" />
            </form>
          : <></>
        }
      </div>
    );
  }
}

export default ProjectAccessForm;

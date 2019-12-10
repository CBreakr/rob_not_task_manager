
import React from "react";

import DropDown from "../DropDown";

const accessLevelList = [
  "none",
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
      accessLevel:"none",
      errorMessage:""
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

    const state = {
      ...this.state,
      foundUser:user
    };

    if(!user){
      state.errorMessage = "user not found";
    }
    else{
      const isAdmin = user.adminProjectAccess.find(accessId => {
        const projectId = this.props.currentProject._id+"";
        return accessId == projectId;
      });
      if(isAdmin){
        state.errorMessage = "user is admin";
      }
    }

    this.setState(state);
  }

  setUserAccess = (evt) => {
    evt.preventDefault();
    if(this.state.foundUser && this.state.accessLevel){
      this.props.setUserAccess(this.props.currentProject, this.state.foundUser, this.state.accessLevel);

      // clear the input
      this.setState({
        foundUser: null,
        userEmail:"",
        accessLevel:"",
        errorMessage:""
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
    let errorMessage = "";

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

      if(this.state.errorMessage){
        errorMessage = this.state.errorMessage;
      }
    }

    return (
      <div>
        <form onSubmit={this.findUserByEmail}>
          <div>
            <input type="text" name="userEmail" value={userEmail} placeholder="email to find" onChange={this.updateInput} />
          </div>
          <input type="submit" className="access_button" value="Find User" />
        </form>
        {
          foundUser && !errorMessage
          ? <form onSubmit={this.setUserAccess}>
              <div>
                Access Level:
                <DropDown
                  name="accessLevel"
                  valueList={accessLevelList}
                  currentValue={accessLevel}
                  updateInput={this.updateInput}
                />
              </div>
              <input type="submit" className="access_button" value="Set Access" />
            </form>
          : <>
            {
              errorMessage
              ? <span>{errorMessage}</span>
              : <></>
            }
            </>
        }
      </div>
    );
  }
}

export default ProjectAccessForm;

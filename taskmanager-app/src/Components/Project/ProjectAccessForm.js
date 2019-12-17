
import React from "react";

import DropDown from "../DropDown";

/*
  element to allow an admin user
  to find another user by exact email
  and to then grant them access
  to the current project
*/

// values for the access level dropdown
const accessLevelList = [
  "none",
  "read",
  "create/edit",
  "admin"
];

// used to set default values
const defaultState = {
  foundUser: null,
  userEmail:"",
  accessLevel:"none",
  errorMessage:""
};

class ProjectAccessForm extends React.Component {

  constructor(){
    super();
    this.state = defaultState;
  }

  //
  // set the state value based on the input name
  //
  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  //
  // call the find user method,
  // passing in the email input value
  //
  findUserByEmail = (evt) => {
    evt.preventDefault();
    if(this.state.userEmail){
      this.props.findUser(this.state.userEmail, this.setUser);
    }
  }

  //
  // get the user (or null) from the search
  // set the state base on the user
  // as well as their potential access level
  //
  // or else display an error message to the user
  //
  setUser = (user) => {
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

      // can't change the access level of an admin
      if(isAdmin){
        state.errorMessage = "user is admin";
      }

      // if the found user has access already
      // set the existing level
      const isUse = user.useProjectAccess.find(accessId => {
        const projectId = this.props.currentProject._id+"";
        return accessId == projectId;
      });

      const isRead = user.readProjectAccess.find(accessId => {
        const projectId = this.props.currentProject._id+"";
        return accessId == projectId;
      });

      if(isUse){
        user.currentAccessLevel = "create/edit";
      }
      else if(isRead){
        user.currentAccessLevel = "read";
      }
    }

    this.setState(state);
  }

  //
  // pull in the user input values,
  // clear the state,
  // call the set user access method,
  // call the on complete method that was passed in
  //
  setUserAccess = (evt) => {
    evt.preventDefault();
    if(this.state.foundUser && this.state.accessLevel){
      this.props.setUserAccess(this.props.currentProject, this.state.foundUser, this.state.accessLevel);

      // clear the input
      this.setState(defaultState);

      if(this.props.onComplete){
        this.props.onComplete();
      }
    }
  }

  //
  // clear the state and then
  // call the on cancel method
  // that was passed in
  //
  onCancel = () => {
    this.setState(defaultState);
    if(this.props.onCancel && typeof this.props.onCancel === "function"){
      this.props.onCancel();
    }
  }

  //
  // RENDER
  //
  render() {

    // get the prop values for the fields
    // or just use empty values
    let foundUser = "";
    let userEmail = "";
    let accessLevel = "";
    let errorMessage = "";
    let currentAccessLevel = "none";

    if(this.state){
      if(this.state.foundUser){
        foundUser = this.state.foundUser;
        if(foundUser.currentAccessLevel){
          currentAccessLevel = foundUser.currentAccessLevel;
        }
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

    //
    // this is really two forms:
    // a form for entering an email address
    // and searching for an existing user
    //
    // and a form with a dropdown for selecting
    // what access level that user
    // should get to the current project
    //
    // there is an error messasge display
    // at the end for any message
    // that needs to be shown to the user
    //
    return (
      <div>
        <div>
          Give access to another user
        </div>
        <form onSubmit={this.findUserByEmail}>
          <div>
            <input type="text"
              name="userEmail"
              value={userEmail}
              placeholder="email to find"
              onChange={this.updateInput} />
          </div>
          <span>
            <input type="submit"
              className="access_button"
              value="Find" />
            <input type="button"
              className="access_button"
              value="Cancel"
              onClick={this.onCancel} />
          </span>
        </form>
        {
          foundUser && !errorMessage
          ? <form onSubmit={this.setUserAccess}>
              <div>
                Access Level:
                <DropDown
                  name="accessLevel"
                  valueList={accessLevelList}
                  currentValue={currentAccessLevel}
                  updateInput={this.updateInput}
                />
              </div>
              <input type="submit"
                className="access_button"
                value="Set Access" />
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

//
// EXPORT
//
export default ProjectAccessForm;

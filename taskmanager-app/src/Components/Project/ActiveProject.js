
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";
import ProjectAccessForm from "../../Containers/Project/ProjectAccessFormContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display the selected project
  and options for edit/delete
  based on user access rights

  if the user is an admin,
  also show the access form
  for granted access to other users

  props expected:
  - project
*/

class ActiveProject extends React.Component {

  constructor(){
    super();
    this.state = {
      projectId: null,
      editMode: false,
      accessMode: false
    };
  }

  //
  // if the current project is changed,
  // set the new id and hide the ProjectForm
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.project && nextProps.project._id != prevState.projectId){
      return {
        projectId: nextProps.project._id,
        editMode: false,
        accessMode: false
      };
    }
    else {
      // no change to the current project
      return null;
    }
  }

  //
  // show the TaskForm for editing
  //
  setEdit = () => {
    console.log("SCREEN set edit");
    this.setState({
      ...this.state,
      editMode:true,
      accessMode:false
    });
  }

  //
  // both onCanel and onComplete
  // just hide the ProjectForm
  //
  onCancel = () => {
    console.log("on cancel");
    this.setState({
      ...this.state,
      editMode:false,
      accessMode:false
    });
  }

  onComplete = () => {
    this.setState({
      ...this.state,
      editMode:false,
      accessMode:false
    });
  }

  //
  // ask the user for confirmation before running delete
  //
  deleteProject = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE project ${this.props.project.projectname}`);
    if(proceed){
      this.props.deleteProject(this.props.project._id);
    }
  }

  //
  // show the access form
  //
  setAccess = () => {
    this.setState({
      ...this.state,
      editMode:false,
      accessMode:true
    });
  }

  //
  // hide the access form
  //
  cancelSetAccess = () => {
    this.setState({
      ...this.state,
      accessMode:false
    });
  }

  //
  // RENDER
  //
  render() {
    // get the project prop if it's set
    // otherwise use an empty value
    let project = null;
    if(this.props && this.props.project){
      project = this.props.project;
    }

    //
    // display each of the field values for
    // the current project, as well as buttons
    // based on the user's access level:
    // "use" access can edit
    // "admin" access can edit and delete
    //  - admin can also use the access form
    //    to manage other users
    //
    // be sure to always clean the values which
    // came from user input before display
    // to make sure there are no HTML tags
    //
    return (
      <div className="active_project_container">
        {
          project
          ?
          <>
          {
            this.state.editMode
            ?
              <ProjectForm
                project={project}
                onCancel={this.onCancel}
                onComplete={this.onComplete}
                submitText="Save" />
            :
            <>
              <div className="active_element_title">
                {cleanValue(project.projectname)}
              </div>
              <div className="description">
                {cleanValue(project.description)}
              </div>
              {
                project.isAdminAccess || project.isUseAccess
                ? <input type="button"
                    className="confirm_button"
                    value="edit"
                    onClick={this.setEdit} />
                : <></>
              }
              {
                project.isAdminAccess
                ? <>
                  <input type="button"
                    className="reject_button"
                    value="delete"
                    onClick={this.deleteProject} />
                  <input type="button"
                    className="access_button"
                    value="Access"
                    onClick={this.setAccess} />
                 </>
                : <></>
              }
            </>
          }
          </>
          :
          <div>
            No Project Selected Yet
          </div>
        }
        {
          this.state.accessMode
          ? <ProjectAccessForm onCancel={this.cancelSetAccess} />
          : <></>
        }
      </div>
    );
  }
}

//
// EXPORT
//
export default ActiveProject;

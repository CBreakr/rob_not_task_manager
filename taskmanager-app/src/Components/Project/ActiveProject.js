
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";
import ProjectAccessForm from "../../Containers/Project/ProjectAccessFormContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

class ActiveProject extends React.Component {

  constructor(){
    super();
    this.state = {
      projectId: null,
      editMode: false,
      accessMode: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.project && nextProps.project._id != prevState.projectId){
      return {
        projectId: nextProps.project._id,
        editMode: false,
        accessMode: false
      };
    }
    else {
      return null;
    }
  }

  setEdit = () => {
    console.log("SCREEN set edit");
    this.setState({
      ...this.state,
      editMode:true,
      accessMode:false
    });
  }

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

  deleteProject = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE project ${this.props.project.projectname}`);
    if(proceed){
      this.props.deleteProject(this.props.project._id);
    }
  }

  setAccess = () => {
    this.setState({
      ...this.state,
      editMode:false,
      accessMode:true
    });
  }

  cancelSetAccess = () => {
    this.setState({
      ...this.state,
      accessMode:false
    });
  }

  render() {
    let project = null;
    if(this.props && this.props.project){
      project = this.props.project;
    }

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
                ? <input type="button" className="confirm_button" value="edit" onClick={this.setEdit} />
                : <></>
              }
              {
                project.isAdminAccess
                ? <>
                  <input type="button" className="reject_button" value="delete" onClick={this.deleteProject} />
                  <input type="button" className="access_button" value="Access" onClick={this.setAccess} />
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

export default ActiveProject;

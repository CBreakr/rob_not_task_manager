
import React from "react";

import ProjectForm from "../Containers/ProjectFormContainer";

class ProjectScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      projectId: null,
      editMode: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.project && nextProps.project._id != prevState.projectId){
      return {
        projectId: nextProps.project._id,
        editMode: false
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
      editMode:true
    });
  }

  onCancel = () => {
    console.log("on cancel");
    this.setState({
      ...this.state,
      editMode:false
    });
  }

  onComplete = () => {
    this.setState({
      ...this.state,
      editMode:false
    });
  }

  render() {
    let project = null;
    if(this.props && this.props.project){
      project = this.props.project;
    }

    return (
      <div>
        {
          project
          ?
          <>
          {
            this.state.editMode
            ?
              <>
              <ProjectForm project={project} onCancel={this.onCancel} onComplete={this.onComplete} />
              </>
            :
            <>
              <div>
                {project.projectname}
              </div>
              <div>
                {project.description}
              </div>
              <input type="button" value="edit" onClick={this.setEdit} />
            </>
          }
          </>
          :
          <div>
            No Project Selected Yet
          </div>
        }
      </div>
    );
  }
}

export default ProjectScreen;

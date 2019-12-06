
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";
import ListScreen from "../../Containers/List/ListScreenContainer";

class ActiveProject extends React.Component {

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

  deleteProject = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE project ${this.props.project.projectname}`);
    if(proceed){
      this.props.deleteProject(this.props.project._id);
    }
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
              <div>
                {project.projectname}
              </div>
              <div>
                {project.description}
              </div>
              <input type="button" value="edit" onClick={this.setEdit} />
              <input type="button" value="delete" onClick={this.deleteProject} />
              <ListScreen />
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

export default ActiveProject;

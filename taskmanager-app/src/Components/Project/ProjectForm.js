
import React from "react";

class ProjectForm extends React.Component {

  constructor() {
    super();
    this.state = {
      projectId:null,
      projectname:null,
      description:null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.project && nextProps.project._id != prevState.projectId){
      return {
        projectId: nextProps.project._id,
        projectname: nextProps.project.projectname,
        description: nextProps.project.description
      };
    }
    else{
      return null;
    }
  }

  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  upsertProject = (evt) => {
    evt.preventDefault();
    let project = {};

    if(this.props.project){
      project = this.props.project;
    }

    project.projectname = this.state.projectname;
    project.description = this.state.description;

    // clear the input
    this.setState({
      projectname: "",
      description: ""
    });

    this.props.upsertProject(project);

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  onCancel = () => {
    this.setState({
      projectname:"",
      description:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  render() {

    let projectname = "";
    let description = "";

    if(this.state){
      projectname = this.state.projectname || "";
      description = this.state.description || "";
    }

    return (
      <div>
        <form onSubmit={this.upsertProject}>
          <div>
            <input type="text" name="projectname" placeholder="name" value={projectname} onChange={this.updateInput} />
          </div>
          <div>
            <textarea name="description" placeholder="description" value={description} onChange={this.updateInput}></textarea>
          </div>
          <span>
            <input type="submit" className="confirm_button" value={this.props.submitText} />
            <input type="button" className="reject_button" value="Cancel" onClick={this.onCancel} />
          </span>
        </form>
      </div>
    );
  }
}

export default ProjectForm;

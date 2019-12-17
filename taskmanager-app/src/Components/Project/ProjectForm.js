
import React from "react";

/*
  element to show the input fields necessary for
  entering a new project or editing an existing one

  props expected:
  - current project (for edit only)
  - on complete method
  - on cancel method
*/

class ProjectForm extends React.Component {

  constructor() {
    super();
    this.state = {
      projectId:null,
      projectname:null,
      description:null
    };
  }

  //
  // if the current project has been changed
  // then fill the deried state with the
  // new values for that project
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.project && nextProps.project._id != prevState.projectId){
      return {
        projectId: nextProps.project._id,
        projectname: nextProps.project.projectname,
        description: nextProps.project.description
      };
    }
    else{
      // no change to the current project
      return null;
    }
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
  // pull in the user input values,
  // clear the state,
  // call the upsert method,
  // call the on complete method that was passed in
  //
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

  //
  // clear the state and then
  // call the on cancel method
  // that was passed in
  //
  onCancel = () => {
    this.setState({
      projectname:"",
      description:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  //
  // RENDER
  //
  render() {

    // get the prop values for the project fields
    // or just use empty values if we're
    // entering a new project
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
            <input type="text"
              name="projectname"
              placeholder="name"
              value={projectname}
              onChange={this.updateInput} />
          </div>
          <div>
            <textarea name="description"
              placeholder="description"
              value={description}
              onChange={this.updateInput}></textarea>
          </div>
          <span>
            <input type="submit"
              className="confirm_button"
              value={this.props.submitText} />
            <input type="button"
              className="reject_button"
              value="Cancel"
              onClick={this.onCancel} />
          </span>
        </form>
      </div>
    );
  }
}

export default ProjectForm;

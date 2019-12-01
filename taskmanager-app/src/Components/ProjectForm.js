
import React from "react";

class ProjectForm extends React.Component {

  constructor() {
    super();
    this.state = {
      projectname: "",
      description: ""
    };
  }

  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  upsertProject = (evt) => {
    evt.preventDefault();
    const project = {
      projectname: this.state.projectname,
      description: this.state.description
    };
    this.props.upsertProject(project);

    // clear the input
    this.setState({
      projectname: "",
      description: ""
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.upsertProject}>
          <input type="text" name="projectname" placeholder="name" value={this.state.projectname} onChange={this.updateInput} />
          <br />
          <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.updateInput} />
          <br />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default ProjectForm;

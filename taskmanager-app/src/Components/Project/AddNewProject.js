
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";

class AddNewProject extends React.Component {

  constructor(){
    super();
    this.state = {
      editMode: false
    };
  }

  setEdit = () => {
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  onCancel = () => {
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

  render(){
    return (
      <>
      {
        this.state.editMode
        ?
          <ProjectForm
            onCancel={this.onCancel}
            onComplete={this.onComplete}
            submitText="Add" />
        :
        <div>
          <input type="button" className="confirm_button" value="Add New Project" onClick={this.setEdit} />
        </div>
      }
      </>
    )
  }
}

export default AddNewProject;

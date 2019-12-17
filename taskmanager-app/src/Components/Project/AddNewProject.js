
import React from "react";

import ProjectForm from "../../Containers/Project/ProjectFormContainer";

/*
  display a button to the user
  if they click this button, show
  the ProjectForm

  pass in onComplete
  and onCancel methods to the form
*/

class AddNewProject extends React.Component {

  constructor(){
    super();
    this.state = {
      editMode: false
    };
  }

  //
  // show the form
  //
  setEdit = () => {
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  //
  // both onCancel and onComplete
  // just hide the form
  //
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

  //
  // RENDER
  //
  render(){
    // if we're in edit mode, then show the form
    // if not, then show the add button
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

//
// EXPORT
//
export default AddNewProject;

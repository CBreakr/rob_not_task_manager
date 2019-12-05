
import React from "react";

import TaskForm from "../../Containers/Task/TaskFormContainer";

class AddNewTask extends React.Component {
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
          <TaskForm
            onCancel={this.onCancel}
            onComplete={this.onComplete}
            submitText="Add" />
        :
        <div>
          <input type="button" value="Add New Task" onClick={this.setEdit} />
        </div>
      }
      </>
    )
  }
}

export default AddNewTask;

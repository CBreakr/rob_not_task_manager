
import React from "react";

import TaskForm from "../../Containers/Task/TaskFormContainer";

class ActiveTask extends React.Component {

  constructor(){
    super();
    this.state = {
      taskId: null,
      editMode: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.list && nextProps.task._id != prevState.taskId){
      return {
        taskId: nextProps.task._id,
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

  deleteTask = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE list ${this.props.task.taskname}`);
    if(proceed){
      this.props.deleteTask(this.props.task);
    }
  }

  render() {
    let task = null;
    if(this.props && this.props.task){
      task = this.props.task;
    }

    return (
      <div>
        {
          task
          ?
          <>
          {
            this.state.editMode
            ?
              <TaskForm
                task={task}
                onCancel={this.onCancel}
                onComplete={this.onComplete}
                submitText="Save" />
            :
            <>
              <div>
                {task.taskname}
              </div>
              <div>
                {task.description}
              </div>
              <input type="button" value="edit" onClick={this.setEdit} />
              <input type="button" value="delete" onClick={this.deleteTask} />
            </>
          }
          </>
          :
          <div>
            No Task Selected Yet
          </div>
        }
      </div>
    );
  }
}

export default ActiveTask;

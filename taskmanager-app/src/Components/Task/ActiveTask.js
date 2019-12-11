
import React from "react";

import TaskForm from "../../Containers/Task/TaskFormContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

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
    let project = null;

    if(this.props && this.props.task){
      task = this.props.task;
    }

    if(this.props && this.props.project){
      project = this.props.project;
    }

    return (
      <div className="active_task_container">
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
              <div className="active_element_title">
                {cleanValue(task.taskname)}
              </div>
              <div className="description">
                {cleanValue(task.description)}
              </div>
              <div className="splitInputDiv">
                <span>status:</span>
                <span>{cleanValue(task.status)}</span>
              </div>
              <div className="splitInputDiv">
                <span>priority:</span>
                <span>{cleanValue(task.priority)}</span>
              </div>
              <div className="splitInputDiv">
                <span>size:</span>
                <span>{cleanValue(task.size)}</span>
              </div>
              <div className="splitInputDiv">
                <span>type:</span>
                <span>{cleanValue(task.type)}</span>
              </div>
              <div>
              {
                project.isUseAccess
                ? <input type="button" className="confirm_button" value="edit" onClick={this.setEdit} />
                : <></>
              }
              {
                project.isAdminAccess
                ? <>
                <input type="button" className="confirm_button" value="edit" onClick={this.setEdit} />
                <input type="button" className="reject_button" value="delete" onClick={this.deleteTask} />
                 </>
                : <></>
              }
              </div>
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

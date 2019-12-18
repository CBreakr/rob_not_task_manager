
import React from "react";
import moment from "moment";

import TaskForm from "../../Containers/Task/TaskFormContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display the selected task,
  including all metadata fields
  and options for edit/delete
  based on user access rights

  props expected:
  - task
  - project
*/

class ActiveTask extends React.Component {

  constructor(){
    super();
    this.state = {
      taskId: null,
      editMode: false
    };
  }

  //
  // if the current task is changed,
  // set the new id and hide the TaskForm
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.list && nextProps.task._id != prevState.taskId){
      return {
        taskId: nextProps.task._id,
        editMode: false
      };
    }
    else {
      // no change to the current task
      return null;
    }
  }

  //
  // show the TaskForm for editing
  //
  setEdit = () => {
    console.log("SCREEN set edit");
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  //
  // both onCanel and onComplete
  // just hide the TaskForm
  //
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

  //
  // ask the user for confirmation before running delete
  //
  deleteTask = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE list ${this.props.task.taskname}`);
    if(proceed){
      this.props.deleteTask(this.props.task);
    }
  }

  //
  // RENDER
  //
  render() {
    // get the task and project props if they're set
    // otherwise use empty values
    let task = null;
    let project = null;

    if(this.props && this.props.task){
      task = this.props.task;

      // format the date before display
      if(task.dueDate){
        task.dueDate = moment(task.dueDate)
                      .format("MM/DD/YYYY");
      }
    }

    if(this.props && this.props.project){
      project = this.props.project;
    }

    //
    // display each of the field values for
    // the current task, as well as buttons
    // based on the user's access level:
    // "use" access can edit
    // "admin" access can edit and delete
    //
    // be sure to always clean the values which
    // came from user input before display
    // to make sure there are no HTML tags
    //
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
              {
                task.dueDate
                ? <div className="splitInputDiv">
                    <span>due date:</span>
                    <span>{cleanValue(task.dueDate)}</span>
                  </div>
                : <></>
              }
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

//
// EXPORT
//
export default ActiveTask;

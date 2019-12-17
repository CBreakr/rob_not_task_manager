
import React from "react";

import moment from "moment";

import DropDown from "../DropDown";

/*
  element to show the input fields necessary for
  entering a new task or editing an existing one

  props expected:
  - current task (for edit only)
  - on complete method
  - on cancel method
*/

//
// values for the respective dropdown fields
//
const statusList = [
  "unstarted",
  "started",
  "paused",
  "finished",
  "deployed",
  "archived"
];

const priorityList = [
  "standard",
  "optional",
  "low",
  "high",
  "emergency"
];

const sizeList = [
  "1", "2", "3", "5", "8"
];

const typeList = [
  "task",
  "bug",
  "chore",
  "meta"
];

// used to set default values
const emptyState = {
  taskId:"",
  taskname:"",
  description:"",
  status:"unstarted",
  priority:"standard",
  size:"1",
  type:"task",
  dueDate:null
};


class TaskForm extends React.Component {

  constructor() {
    super();
    this.state = emptyState;
  }

  //
  // if the current task has been changed
  // then fill the deried state with the
  // new values for that task
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.task && nextProps.task._id != prevState.taskId){
      const ret = {
        taskId: nextProps.task._id,
        taskname: nextProps.task.taskname,
        description: nextProps.task.description,
        status: nextProps.task.status,
        priority: nextProps.task.priority,
        size: nextProps.task.size,
        type: nextProps.task.type,
        dueDate : null
      };

      // get the due date in the right display format
      if(nextProps.task.dueDate){
        ret.dueDate = moment(nextProps.task.dueDate)
                      .format("MM/DD/YYYY");
      }

      return ret;
    }
    else{
      // no change to the current task
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
  upsertTask = (evt) => {
    evt.preventDefault();
    let task = {};

    if(this.props.task){
      task = this.props.task;
    }

    task.taskname = this.state.taskname;
    task.description = this.state.description;
    task.status = this.state.status;
    task.priority = this.state.priority;
    task.size = this.state.size;
    task.type = this.state.type;

    // make sure we have a proper date
    const d = Date.parse(this.state.dueDate);
    if(this.state.dueDate && isNaN(d)) {
      alert("invalid date");
      return;
    }
    else{
      task.dueDate = d;
    }

    // clear the input
    this.setState(emptyState);

    this.props.upsertTask(task, this.props.list._id);

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
    this.setState(emptyState);

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  //
  // RENDER
  //
  render() {

    // get the prop values for the task fields
    // or just use empty values if we're
    // entering a new task
    let taskname = "";
    let description = "";
    let status = "";
    let priority = "";
    let size = "";
    let type = "";
    let dueDate = "";

    if(this.state){
      taskname = this.state.taskname || "";
      description = this.state.description || "";
      status = this.state.status || "";
      priority = this.state.priority || "";
      size = this.state.size || "";
      type = this.state.type || "";
      dueDate = this.state.dueDate || null;
    }

    // each field gets its own row
    // with the metadata fields displayed
    // as two columns: fieldname and input element
    return (
      <div>
        <form onSubmit={this.upsertTask}>
          <div>
            <input type="text"
              name="taskname"
              placeholder="name"
              value={taskname}
              onChange={this.updateInput} />
          </div>
          <div>
            <textarea name="description"
              placeholder="description"
              value={description}
              onChange={this.updateInput}></textarea>
          </div>
          <div className="splitInputDiv">
            <span>
              Status:
            </span>
            <DropDown
              name="status"
              valueList={statusList}
              currentValue={status}
              updateInput={this.updateInput}
            />
          </div>
          <div className="splitInputDiv">
            <span>
              Priority:
            </span>
            <DropDown
              name="priority"
              valueList={priorityList}
              currentValue={priority}
              updateInput={this.updateInput}
            />
          </div>
          <div class="splitInputDiv">
            <span>
              Type:
            </span>
            <DropDown
              name="type"
              valueList={typeList}
              currentValue={type}
              updateInput={this.updateInput}
            />
          </div>
          <div class="splitInputDiv">
            <span>
              Size:
            </span>
            <DropDown
              name="size"
              valueList={sizeList}
              currentValue={size}
              updateInput={this.updateInput}
            />
          </div>
          <div className="splitInputDiv">
            Due Date:
            <input type="text"
              className="dateInput"
              name="dueDate"
              value={dueDate}
              onChange={this.updateInput} />
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

//
// EXPORT
//
export default TaskForm;

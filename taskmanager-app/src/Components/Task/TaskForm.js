
import React from "react";

import moment from "moment";

import DropDown from "../DropDown";

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

// need to remember to set default values
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

      if(nextProps.task.dueDate){
        ret.dueDate = moment(nextProps.task.dueDate).format("MM/DD/YYYY");
      }

      return ret;
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

    const d = Date.parse(this.state.dueDate);
    if(this.state.dueDate && isNaN(d)) {
      alert("invalid date");
      return;
    }
    else{
      task.dueDate = d;
    }

    console.log("upsert props", {list: this.props.list});

    this.props.upsertTask(task, this.props.list._id);

    // clear the input
    this.setState(emptyState);

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  onCancel = () => {
    this.setState(emptyState);

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  render() {

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

    return (
      <div>
        <form onSubmit={this.upsertTask}>
          <input type="text" name="taskname" placeholder="name" value={taskname} onChange={this.updateInput} />
          <br />
          <textarea name="description" placeholder="description" value={description} onChange={this.updateInput}></textarea>
          <br />
          Status:
          <DropDown
            name="status"
            valueList={statusList}
            currentValue={status}
            updateInput={this.updateInput}
          />
          <br />
          Priority:
          <DropDown
            name="priority"
            valueList={priorityList}
            currentValue={priority}
            updateInput={this.updateInput}
          />
          <br />
          Size:
          <DropDown
            name="size"
            valueList={sizeList}
            currentValue={size}
            updateInput={this.updateInput}
          />
          <br />
          Type:
          <DropDown
            name="type"
            valueList={typeList}
            currentValue={type}
            updateInput={this.updateInput}
          />
          <br />
          <input type="text" name="dueDate" placeholder="due date" value={dueDate} onChange={this.updateInput} />
          <br />
          <input type="submit" value={this.props.submitText} />
          <input type="button" value="Cancel" onClick={this.onCancel} />
        </form>
      </div>
    );
  }
}

/*
<select name="status" onChange={this.updateInput}>
{
  StatusList.map(status => {
    if(status===this.state.status){
      return <option selected value={status}>{status}</option>
    }
    else{
      return <option value={status}>{status}</option>
    }
  })
}
</select>
*/

export default TaskForm;

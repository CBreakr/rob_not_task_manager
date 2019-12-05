
import React from "react";

const StatusList = [
  "unstarted",
  "started",
  "paused",
  "finished",
  "deployed",
  "archived"
];

class TaskForm extends React.Component {

  constructor() {
    super();
    this.state = {
      taskId:null,
      taskname:null,
      description:null,
      status: null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.task && nextProps.task._id != prevState.taskId){
      return {
        taskId: nextProps.task._id,
        taskname: nextProps.task.taskname,
        description: nextProps.task.description,
        status: nextProps.task.status
      };
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

    console.log("upsert props", {list: this.props.list});

    this.props.upsertTask(task, this.props.list._id);

    // clear the input
    this.setState({
      taskname: "",
      description: "",
      status: ""
    });

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  onCancel = () => {
    this.setState({
      taskname:"",
      description:"",
      status:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  render() {

    let taskname = "";
    let description = "";
    let status = "";

    if(this.state){
      taskname = this.state.taskname || "";
      description = this.state.description || "";
      status = this.state.status || "";
    }

    return (
      <div>
        <form onSubmit={this.upsertTask}>
          <input type="text" name="taskname" placeholder="name" value={taskname} onChange={this.updateInput} />
          <br />
          <textarea name="description" placeholder="description" value={description} onChange={this.updateInput}></textarea>
          <br />
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
          <br />
          <input type="submit" value={this.props.submitText} />
          <input type="button" value="Cancel" onClick={this.onCancel} />
        </form>
      </div>
    );
  }
}

export default TaskForm;

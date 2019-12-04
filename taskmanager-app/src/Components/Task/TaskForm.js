
import React from "react";

class TaskForm extends React.Component {

  constructor() {
    super();
    this.state = {
      taskId:null,
      taskname:null,
      description:null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.task && nextProps.task._id != prevState.taskId){
      return {
        taskId: nextProps.task._id,
        taskname: nextProps.task.taskname,
        description: nextProps.task.description
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

    console.log("upsert props", {list: this.props.list});

    this.props.upsertTask(task, this.props.list._id);

    // clear the input
    this.setState({
      taskname: "",
      description: ""
    });

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  onCancel = () => {
    this.setState({
      taskname:"",
      description:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  render() {

    let taskname = "";
    let description = "";

    if(this.state){
      taskname = this.state.taskname || "";
      description = this.state.description || "";
    }

    return (
      <div>
        <form onSubmit={this.upsertTask}>
          <input type="text" name="taskname" placeholder="name" value={taskname} onChange={this.updateInput} />
          <br />
          <input type="text" name="description" placeholder="description" value={description} onChange={this.updateInput} />
          <br />
          <input type="submit" value={this.props.submitText} />
          <input type="button" value="Cancel" onClick={this.onCancel} />
        </form>
      </div>
    );
  }
}

export default TaskForm;

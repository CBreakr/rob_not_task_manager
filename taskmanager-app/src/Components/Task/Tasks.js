
import React from "react";

class Tasks extends React.Component {

  selectTask = (evt) => {
    const taskId = evt.target.getAttribute("taskid");
    this.props.setCurrentTask(taskId);
  }

  render(){

    let tasks = [];
    if(this.props.tasks){
      tasks = this.props.tasks;
    }

    return (
      <div>
        Tasks:
        <ul>
        {
          tasks.map(task => {
            return (
              <li key={task._id} taskid={task._id} onClick={this.selectTask}>{task.taskname}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Tasks;
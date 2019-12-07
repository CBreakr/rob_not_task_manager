
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
        <ul>
        {
          tasks.map(task => {
            return (
              <li className="task_element" key={task._id} taskid={task._id} onClick={this.selectTask}>{task.taskname} ({task.status}, {task.priority})</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Tasks;

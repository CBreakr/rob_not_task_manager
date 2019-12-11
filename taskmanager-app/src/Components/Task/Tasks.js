
import React from "react";

import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

class Tasks extends React.Component {

  selectTask = (evt) => {
    const taskId = evt.target.getAttribute("taskid");
    this.props.setCurrentTask(taskId);
  }

  render(){

    let tasks = [];
    let currentTask = null;

    if(this.props.tasks){
      tasks = this.props.tasks;
    }

    console.log("CURRENT TASK?", {currentTask: this.props.currentTask});

    let statusClass = "task_unfinished";

    if(this.props.currentTask){
      currentTask = this.props.currentTask;
    }

    return (
      <div>
        <ul>
        {
          tasks.map(task => {
            return (
              <>
                {
                  currentTask && currentTask._id == task._id
                  ?
                  <li className="task_element_active"
                    key={task._id}
                    taskid={task._id}>
                    <ActiveTask task={currentTask} />
                  </li>
                  :
                  <li className="task_element"
                    key={task._id}
                    taskid={task._id}
                    onClick={this.selectTask}>
                    {cleanValue(task.taskname)}
                    (<span className={
                      task.status === "finished"
                      || task.status === "deployed"
                      || task.status === "archived"
                      ? "task_finished"
                      : "task_unfinished"
                    }>{cleanValue(task.status)}</span>,
                    {cleanValue(task.priority)})
                  </li>
                }
              </>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Tasks;

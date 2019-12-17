
import React from "react";

import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display all tasks for the current list
  as <li> within a <ul>,
  making a distinction for the current task

  props expected:
  - tasks
  - current task
*/

class Tasks extends React.Component {

  selectTask = (evt) => {
    const taskId = evt.target.getAttribute("taskid");
    this.props.setCurrentTask(taskId);
  }

  //
  // RENDER
  //
  render(){

    // get the prop values for
    // the tasks and current task
    // if they exist,
    // otherwise use default empty values
    let tasks = [];
    let currentTask = null;

    if(this.props.tasks){
      tasks = this.props.tasks;
    }

    let statusClass = "task_unfinished";

    if(this.props.currentTask){
      currentTask = this.props.currentTask;
    }

    // loop through all tasks
    // and display them
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

//
// EXPORT
//
export default Tasks;

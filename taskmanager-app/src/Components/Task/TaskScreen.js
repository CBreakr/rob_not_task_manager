
import React from "react";

// import TaskForm from "../../Containers/Task/TaskFormContainer";
// <TaskForm submitText="Add" />
import AddNewTask from "./AddNewTask";
import Tasks from "../../Containers/Task/TasksContainer";
import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

// <ActiveTask />

class TaskScreen extends React.Component {
  render() {
    return(
      <div className="task_screen">
        <div className="task_header">
          <h2>Tasks</h2>
        </div>
        <div className="task_container">
          {
            this.props.listSelected
            ? <AddNewTask />
            : <></>
          }
          <Tasks />
        </div>
      </div>
    );
  }
}

export default TaskScreen;


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
        <h2>Tasks</h2>
        <AddNewTask />
        <Tasks />
      </div>
    );
  }
}

export default TaskScreen;

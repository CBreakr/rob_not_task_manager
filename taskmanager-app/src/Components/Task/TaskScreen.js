
import React from "react";

// import TaskForm from "../../Containers/Task/TaskFormContainer";
// <TaskForm submitText="Add" />
import AddNewTask from "./AddNewTask";
import Tasks from "../../Containers/Task/TasksContainer";
import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

class TaskScreen extends React.Component {
  render() {
    return(
      <div>
        <AddNewTask />
        <Tasks />
        <ActiveTask />
      </div>
    );
  }
}

export default TaskScreen;

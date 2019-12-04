
import React from "react";

import TaskForm from "../../Containers/Task/TaskFormContainer";
import Tasks from "../../Containers/Task/TasksContainer";
import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

class TaskScreen extends React.Component {
  render() {
    return(
      <div>
        TASK SCREEN
        <TaskForm submitText="Add" />
        <Tasks />
        <ActiveTask />
      </div>
    );
  }
}

export default TaskScreen;

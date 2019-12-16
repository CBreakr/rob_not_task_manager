
import React from "react";

import { Scrollbars } from "react-custom-scrollbars";

// import TaskForm from "../../Containers/Task/TaskFormContainer";
// <TaskForm submitText="Add" />
import AddNewTask from "./AddNewTask";
import Tasks from "../../Containers/Task/TasksContainer";
import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

// <ActiveTask />

class TaskScreen extends React.Component {

  hasAddAccess = () => {
    if(this.props && this.props.currentProject &&
      (this.props.currentProject.isAdminAccess
      || this.props.currentProject.isUseAccess)
    ){
      return true;
    }
    return false;
  }

  render() {
    return(
      <div className="task_screen">
        <div className="task_header">
          <h2>Tasks</h2>
        </div>
        <Scrollbars autoWidth autoHide style={{height:"85vh"}}>
        <div className="task_container">
          {
            this.props.listSelected && this.hasAddAccess()
            ? <AddNewTask />
            : <></>
          }
          <Tasks />
        </div>
        </Scrollbars>
      </div>
    );
  }
}

export default TaskScreen;

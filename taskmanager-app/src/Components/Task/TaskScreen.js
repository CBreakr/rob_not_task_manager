
import React from "react";

import { Scrollbars } from "react-custom-scrollbars";

import AddNewTask from "./AddNewTask";
import Tasks from "../../Containers/Task/TasksContainer";
import ActiveTask from "../../Containers/Task/ActiveTaskContainer";

/*
  parent element for all parts of the
  Task display, showing the set of tasks
*/

class TaskScreen extends React.Component {

  //
  // check if the user has the access rights
  // to add tasks within the current project
  // - this requires "use" or "admin" access
  //
  hasAddAccess = () => {
    if(this.props && this.props.currentProject &&
      (this.props.currentProject.isAdminAccess
      || this.props.currentProject.isUseAccess)
    ){
      return true;
    }
    return false;
  }

  //
  // RENDER
  //
  render() {
    // if the user has access to add a task,
    // show the AddNewTask component
    //
    // in any case, show the tasks
    // for the current list
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

//
// EXPORT
//
export default TaskScreen;

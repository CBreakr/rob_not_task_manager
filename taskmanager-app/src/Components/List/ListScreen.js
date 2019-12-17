
import React from "react";

import { Scrollbars } from "react-custom-scrollbars";

import AddNewList from "./AddNewList";
import Lists from "../../Containers/List/ListsContainer";

/*
  parent element for all parts of the
  List display, showing the set of lists
*/

class ListScreen extends React.Component {

  //
  // check if the user has the access rights
  // to add lists within the current project
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
    // if the user has access to add a list,
    // show the AddNewList component
    //
    // in any case, show the lists
    // for the current project
    return(
      <div className="list_screen">
        <div className="list_header">
          <h2>Lists</h2>
        </div>
        <Scrollbars autoWidth autoHide style={{height:"85vh"}}>
          <div className="list_container">
            {
              this.props.currentProject && this.hasAddAccess()
              ? <AddNewList />
              : <></>
            }
            <Lists />
          </div>
        </Scrollbars>
      </div>
    );
  }
}

//
// EXPORT
//
export default ListScreen;

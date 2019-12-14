
import React from "react";

import { Scrollbars } from "react-custom-scrollbars";

// import ListForm from "../../Containers/List/ListFormContainer";
// <ListForm submitText="Add" />
import AddNewList from "./AddNewList";
import Lists from "../../Containers/List/ListsContainer";

class ListScreen extends React.Component {

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

function userHasAccess(user, project){

}

export default ListScreen;

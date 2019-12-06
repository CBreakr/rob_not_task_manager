
import React from "react";

// import ListForm from "../../Containers/List/ListFormContainer";
// <ListForm submitText="Add" />
import AddNewList from "./AddNewList";
import Lists from "../../Containers/List/ListsContainer";
import ActiveList from "../../Containers/List/ActiveListContainer";

class ListScreen extends React.Component {
  render() {
    return(
      <div className="list_screen">
        <AddNewList />
        <Lists />
        <ActiveList />
      </div>
    );
  }
}

export default ListScreen;

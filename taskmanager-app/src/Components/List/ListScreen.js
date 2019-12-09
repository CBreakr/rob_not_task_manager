
import React from "react";

// import ListForm from "../../Containers/List/ListFormContainer";
// <ListForm submitText="Add" />
import AddNewList from "./AddNewList";
import Lists from "../../Containers/List/ListsContainer";

class ListScreen extends React.Component {
  render() {
    return(
      <div className="list_screen">
        <h2>Lists:</h2>
        <AddNewList />
        <Lists />
      </div>
    );
  }
}

export default ListScreen;

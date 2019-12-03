
import React from "react";

import ListForm from "../Containers/ListFormContainer";
import Lists from "../Containers/ListsContainer";
import ActiveList from "../Containers/ActiveListContainer";

class ListScreen extends React.Component {
  render() {
    return(
      <div>
        <ListForm submitText="Add" />
        <Lists />
        <ActiveList />
      </div>
    );
  }
}

export default ListScreen;


import React from "react";

import ListForm from "../../Containers/List/ListFormContainer";
import Lists from "../../Containers/List/ListsContainer";
import ActiveList from "../../Containers/List/ActiveListContainer";

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

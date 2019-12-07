
import React from "react";

import ListForm from "../../Containers/List/ListFormContainer";

class AddNewList extends React.Component {
  constructor(){
    super();
    this.state = {
      editMode: false
    };
  }

  setEdit = () => {
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  onCancel = () => {
    this.setState({
      ...this.state,
      editMode:false
    });
  }

  onComplete = () => {
    this.setState({
      ...this.state,
      editMode:false
    });
  }

  render(){
    return (
      <>
      {
        this.state.editMode
        ?
          <ListForm
            onCancel={this.onCancel}
            onComplete={this.onComplete}
            submitText="Add" />
        :
        <div>
          <input type="button" className="confirm_button" value="Add New List" onClick={this.setEdit} />
        </div>
      }
      </>
    )
  }
}

export default AddNewList;

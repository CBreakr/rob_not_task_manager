
import React from "react";

import ListForm from "../../Containers/List/ListFormContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display the selected list
  and options for edit/delete
  based on user access rights

  props expected:
  - list
  - project
*/

class ActiveList extends React.Component {

  constructor(){
    super();
    this.state = {
      listId: null,
      editMode: false
    };
  }

  //
  // if the current list is changed,
  // set the new id and hide the ListForm
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.list && nextProps.list._id != prevState.listId){
      return {
        listId: nextProps.list._id,
        editMode: false
      };
    }
    else {
      // no change to the current list
      return null;
    }
  }

  //
  // show the TaskForm for editing
  //
  setEdit = () => {
    console.log("SCREEN set edit");
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  //
  // both onCanel and onComplete
  // just hide the ListForm
  //
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

  //
  // ask the user for confirmation before running delete
  //
  deleteList = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE list ${this.props.list.listname}`);
    if(proceed){
      this.props.deleteList(this.props.list);
    }
  }

  //
  // RENDER
  //
  render() {
    // get the list and project props if they're set
    // otherwise use empty values
    let list = null;
    let project = null;

    if(this.props && this.props.list){
      list = this.props.list;
    }

    if(this.props && this.props.project){
      project = this.props.project;
    }

    //
    // display each of the field values for
    // the current list, as well as buttons
    // based on the user's access level:
    // "use" access can edit
    // "admin" access can edit and delete
    //
    // be sure to always clean the values which
    // came from user input before display
    // to make sure there are no HTML tags
    //
    return (
      <div className="active_list_container">
        {
          list
          ?
          <>
          {
            this.state.editMode
            ?
              <ListForm
                list={list}
                onCancel={this.onCancel}
                onComplete={this.onComplete}
                submitText="Save" />
            :
            <>
              <div className="active_element_title">
              {cleanValue(list.listname)}
              </div>
              <div className="description">
                {cleanValue(list.description)}
              </div>
              {
                project.isUseAccess
                ? <input type="button"
                    className="confirm_button"
                    value="edit"
                    onClick={this.setEdit} />
                : <></>
              }
              {
                project.isAdminAccess
                ? <>
                <input type="button"
                  className="confirm_button"
                  value="edit"
                  onClick={this.setEdit} />
                <input type="button"
                  className="reject_button"
                  value="delete"
                  onClick={this.deleteList} />
                 </>
                : <></>
              }
            </>
          }
          </>
          :
          <div>
            No List Selected Yet
          </div>
        }
      </div>
    );
  }
}

//
// EXPORT
//
export default ActiveList;


import React from "react";

import ListForm from "../../Containers/List/ListFormContainer";
import TaskScreen from "../../Containers/Task/TaskScreenContainer";

class ActiveList extends React.Component {

  constructor(){
    super();
    this.state = {
      listId: null,
      editMode: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps && nextProps.list && nextProps.list._id != prevState.listId){
      return {
        listId: nextProps.list._id,
        editMode: false
      };
    }
    else {
      return null;
    }
  }

  setEdit = () => {
    console.log("SCREEN set edit");
    this.setState({
      ...this.state,
      editMode:true
    });
  }

  onCancel = () => {
    console.log("on cancel");
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

  deleteList = () => {
    const proceed = window.confirm(`Are you sure you want to PERMANENTLY DELETE list ${this.props.list.listname}`);
    if(proceed){
      this.props.deleteList(this.props.list);
    }
  }

  render() {
    let list = null;
    if(this.props && this.props.list){
      list = this.props.list;
    }

    return (
      <div>
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
              <div>
                {list.listname}
              </div>
              <div>
                {list.description}
              </div>
              <input type="button" value="edit" onClick={this.setEdit} />
              <input type="button" value="delete" onClick={this.deleteList} />
              <TaskScreen />
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

export default ActiveList;
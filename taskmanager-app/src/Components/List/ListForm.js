
import React from "react";

/*
  element to show the input fields necessary for
  entering a new list or editing an existing one

  props expected:
  - current list (for edit only)
  - on complete method
  - on cancel method
*/

class ListForm extends React.Component {

  constructor() {
    super();
    this.state = {
      listId:null,
      listname:null,
      description:null
    };
  }

  //
  // if the current list has been changed
  // then fill the deried state with the
  // new values for that list
  //
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.list && nextProps.list._id != prevState.listId){
      return {
        listId: nextProps.list._id,
        listname: nextProps.list.listname,
        description: nextProps.list.description
      };
    }
    else{
      // no change to the current list
      return null;
    }
  }

  //
  // set the state value based on the input name
  //
  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  //
  // pull in the user input values,
  // clear the state,
  // call the upsert method,
  // call the on complete method that was passed in
  //
  upsertList = (evt) => {
    evt.preventDefault();
    let list = {};

    if(this.props.list){
      list = this.props.list;
    }

    list.listname = this.state.listname;
    list.description = this.state.description;

    console.log("upsert props", {project: this.props.project});

    // clear the input
    this.setState({
      listname: "",
      description: ""
    });

    this.props.upsertList(list, this.props.project._id);

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  //
  // clear the state and then
  // call the on cancel method
  // that was passed in
  //
  onCancel = () => {
    this.setState({
      listname:"",
      description:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  //
  // RENDER
  //
  render() {

    // get the prop values for the list fields
    // or just use empty values if we're
    // entering a new list
    let listname = "";
    let description = "";

    if(this.state){
      listname = this.state.listname || "";
      description = this.state.description || "";
    }

    return (
      <div>
        <form onSubmit={this.upsertList}>
          <div>
            <input type="text"
              name="listname"
              placeholder="name"
              value={listname}
              onChange={this.updateInput} />
          </div>
          <div>
            <textarea name="description"
              placeholder="description"
              value={description}
              onChange={this.updateInput}></textarea>
          </div>
          <span>
            <input type="submit"
              className="confirm_button"
              value={this.props.submitText} />
            <input type="button"
              className="reject_button"
              value="Cancel"
              onClick={this.onCancel} />
          </span>
        </form>
      </div>
    );
  }
}

//
// EXPORT
//
export default ListForm;

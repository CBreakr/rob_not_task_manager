
import React from "react";

class ListForm extends React.Component {

  constructor() {
    super();
    this.state = {
      listId:null,
      listname:null,
      description:null
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.list && nextProps.list._id != prevState.listId){
      return {
        listId: nextProps.list._id,
        listname: nextProps.list.listname,
        description: nextProps.list.description
      };
    }
    else{
      return null;
    }
  }

  updateInput = (evt) => {
    const newState = {...this.state};
    newState[evt.target.name] = evt.target.value;
    this.setState(newState);
  }

  upsertList = (evt) => {
    evt.preventDefault();
    let list = {};

    if(this.props.list){
      list = this.props.list;
    }

    list.listname = this.state.listname;
    list.description = this.state.description;

    console.log("upsert props", {project: this.props.project});

    this.props.upsertList(list, this.props.project._id);

    // clear the input
    this.setState({
      listname: "",
      description: ""
    });

    if(this.props.onComplete){
      this.props.onComplete();
    }
  }

  onCancel = () => {
    this.setState({
      listname:"",
      description:""
    });

    if(this.props.onCancel){
      this.props.onCancel();
    }
  }

  render() {

    let listname = "";
    let description = "";

    if(this.state){
      listname = this.state.listname || "";
      description = this.state.description || "";
    }

    return (
      <div>
        <form onSubmit={this.upsertList}>
          <input type="text" name="listname" placeholder="name" value={listname} onChange={this.updateInput} />
          <br />
          <textarea name="description" placeholder="description" value={description} onChange={this.updateInput}></textarea>
          <br />
          <input type="submit" value={this.props.submitText} />
          <input type="button" value="Cancel" onClick={this.onCancel} />
        </form>
      </div>
    );
  }
}

export default ListForm;


import React from "react";

class Lists extends React.Component {

  selectList = (evt) => {
    const listId = evt.target.getAttribute("listid");
    this.props.setCurrentList(listId);
  }

  render(){

    let lists = [];
    if(this.props.lists){
      lists = this.props.lists;
    }

    return (
      <div>
        <ul>
        {
          lists.map(list => {
            return (
              <li className="list_element" key={list._id} listid={list._id} onClick={this.selectList}>{list.listname}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Lists;


import React from "react";

import ActiveList from "../../Containers/List/ActiveListContainer";

class Lists extends React.Component {

  selectList = (evt) => {
    const listId = evt.target.getAttribute("listid");
    this.props.setCurrentList(listId);
  }

  render(){

    let lists = [];
    let currentList = null;

    if(this.props.lists){
      lists = this.props.lists;
    }

    if(this.props.currentList){
      currentList = this.props.currentList;
    }

    return (
      <div className="list_container">
        <ul>
        {
          lists.map(list => {
            return (
              <>
                {
                  currentList && currentList._id == list._id
                  ?
                  <li className="list_element_active"
                    key={list._id}
                    listid={list._id}>
                    <ActiveList list={currentList} />
                  </li>
                  :
                  <li className="list_element"
                    key={list._id}
                    listid={list._id}
                    onClick={this.selectList}>
                    {list.listname}
                  </li>
                }
              </>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default Lists;

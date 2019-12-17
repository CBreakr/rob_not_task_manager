
import React from "react";

import ActiveList from "../../Containers/List/ActiveListContainer";

import cleanValue from "../../formatUtilities/cleanUserInput";

/*
  display all lists for the current project
  as <li> within a <ul>,
  making a distinction for the current list

  props expected:
  - lists
  - current list
*/

class Lists extends React.Component {

  selectList = (evt) => {
    const listId = evt.target.getAttribute("listid");
    this.props.setCurrentList(listId);
  }

  //
  // RENDER
  //
  render(){

    // get the prop values for
    // the lists and current list
    // if they exist,
    // otherwise use default empty values
    let lists = [];
    let currentList = null;

    if(this.props.lists){
      lists = this.props.lists;
    }

    if(this.props.currentList){
      currentList = this.props.currentList;
    }

    // loop trhough all lists
    // and display them
    return (
      <div>
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
                    {cleanValue(list.listname)}
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

//
// EXPORT
//
export default Lists;

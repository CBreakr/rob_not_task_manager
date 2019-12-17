
import React from "react";

/*
  display a list of values passed into the component
  as <option> within a <select>

  props expected:
    - name
    - updateInput() to fire on selection change
    - valueList
    - currentValue (optional)
*/

class DropDown extends React.Component {
  render() {
    return (
      <select name={this.props.name}
        onChange={this.props.updateInput}>
      {
        this.props.valueList.map(value => {
          if(value == this.props.currentValue){
            return <option key={value}
                    selected
                    value={value}>
                      {value}
                    </option>
          }
          else{
            return <option key={value}
                    value={value}>
                      {value}
                    </option>
          }
        })
      }
      </select>
    );
  }
}

//
// EXPORT
//
export default DropDown;

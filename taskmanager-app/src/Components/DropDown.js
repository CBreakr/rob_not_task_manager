
import React from "react";

class DropDown extends React.Component {
  render() {
    return (
      <select name={this.props.name} onChange={this.props.updateInput}>
      {
        this.props.valueList.map(value => {
          if(value === this.props.currentValue){
            return <option key={value} selected value={value}>{value}</option>
          }
          else{
            return <option key={value} value={value}>{value}</option>
          }
        })
      }
      </select>
    );
  }
}

export default DropDown;

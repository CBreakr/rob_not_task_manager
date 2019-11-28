
import React from "react";

class ReduxTest extends React.Component {

  componentDidMount() {
    this.props.RunTest();
    setTimeout(() => {
      this.props.RunTest();
    }, 500);
  }

  render() {
    return (
      <div>
        Test
        <div>
          AAA
          {this.props.testVal}
          BBB
        </div>
      </div>
    );
  }
}

export default ReduxTest;

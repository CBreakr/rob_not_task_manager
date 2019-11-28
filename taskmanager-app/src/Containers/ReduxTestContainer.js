
import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import ReduxTest from "../Components/ReduxTest";

const mapStateToProps = (state, props) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    RunTest: () => DispatchActions.testTrigger(dispatch)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ReduxTest);


import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import ListScreen from "../Components/ListScreen";

const mapStateToProps = (state) => {
  // do we need anything from the main state?
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ListScreen);

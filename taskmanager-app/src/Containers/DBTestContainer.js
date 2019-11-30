
import { connect } from "react-redux";

import { ActionTypes } from "../Reducers/Actions";
import DBTest from "../Components/DBTest";

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(DBTest);

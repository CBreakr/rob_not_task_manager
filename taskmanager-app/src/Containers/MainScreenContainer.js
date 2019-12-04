
import { connect } from "react-redux";

import DispatchActions from "../Reducers/Actions/UserActions";

import MainScreen from "../Components/MainScreen";

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => DispatchActions.getUser(dispatch)
  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(MainScreen);


import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import LoginForm from "../Components/LoginForm";

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => DispatchActions.login(dispatch, user)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(LoginForm);

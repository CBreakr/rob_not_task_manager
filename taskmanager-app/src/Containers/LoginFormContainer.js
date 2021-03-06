
import { connect } from "react-redux";

import DispatchActions from "../Reducers/Actions/UserActions";

import LoginForm from "../Components/LoginForm";

/*
pass along:
- login method
*/

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: user => DispatchActions.login(dispatch, user)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(LoginForm);

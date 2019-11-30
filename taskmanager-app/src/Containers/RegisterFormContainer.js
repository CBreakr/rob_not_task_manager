
import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import RegisterForm from "../Components/RegisterForm";

const mapStateToProps = (state) => {
  return {...state};
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => DispatchActions.register(dispatch, newUser)
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(RegisterForm);

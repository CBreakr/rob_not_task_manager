
import { connect } from "react-redux";

import DispatchActions from "../Reducers/Actions/UserActions";

import RegisterForm from "../Components/RegisterForm";

/*
pass along:
- user register method
*/

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (newUser) => DispatchActions.register(dispatch, newUser)
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(RegisterForm);

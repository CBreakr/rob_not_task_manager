
import { connect } from "react-redux";

import DispatchActions from "../Reducers/Actions/UserActions";

import Logout from "../Components/Logout";

const mapStateToProps = (state) => {
  if(state.currentUser){
    return {email:state.currentUser.email};
  }
  // I don't need anything here
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => DispatchActions.logout(dispatch)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(Logout);

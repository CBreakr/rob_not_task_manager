
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/UserActions";

import ProjectAccessForm from "../../Components/Project/ProjectAccessForm";

/*
pass along:
- current project
- find user by email method
- set user access method
*/

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    findUser: (userEmail, callback) => DispatchActions.findUserByEmail(dispatch, userEmail, callback),
    setUserAccess: (currentProject, foundUser, accessLevel) => DispatchActions.setUserAccessForProject(dispatch, currentProject, foundUser, accessLevel)
  }
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ProjectAccessForm);

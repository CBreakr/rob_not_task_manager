
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/ProjectActions";

import ActiveProject from "../../Components/Project/ActiveProject";

/*
pass along:
- delete project method
*/

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => DispatchActions.deleteProject(dispatch, projectId)
  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveProject);

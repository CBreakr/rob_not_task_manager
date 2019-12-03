
import { connect } from "react-redux";

import ActiveProject from "../Components/ActiveProject";

import { DispatchActions } from "../Reducers/Actions";

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentProject){
    props.project = {...state.currentProject};
  }
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProjectEdit: (project) => DispatchActions.setProjectEdit(dispatch, project),
    deleteProject: (projectId) => DispatchActions.deleteProject(dispatch, projectId)
  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveProject);

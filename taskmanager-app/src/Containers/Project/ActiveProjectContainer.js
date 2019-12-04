
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/ProjectActions";

import ActiveProject from "../../Components/Project/ActiveProject";

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentProject){
    props.project = {...state.currentProject};
  }
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => DispatchActions.deleteProject(dispatch, projectId)
  };
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveProject);

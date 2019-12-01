
import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import ProjectList from "../Components/ProjectList";

const mapStateToProps = (state) => {
  const props = {
    user: null,
    projects: null
  }

  if(state.currentUser) {
    props.user = state.currentUser;
    if(state.projects){
      props.projects = [...state.projects];
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => DispatchActions.getProjects(dispatch),
    setCurrentProject: (project) => DispatchActions.setProject(dispatch, project)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ProjectList);

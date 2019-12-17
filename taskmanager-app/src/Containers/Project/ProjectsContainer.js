
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/ProjectActions";

import Projects from "../../Components/Project/Projects";

/*
pass along:
- current user
- projects
- current project
- get projects method
- set current project method
*/

const mapStateToProps = (state) => {
  const props = {
    user: null,
    projects: null,
    currentProject: null
  }

  if(state.currentUser) {
    props.user = state.currentUser;
    if(state.projects){
      props.projects = [...state.projects];
    }

    if(state.currentProject) {
      props.currentProject = {...state.currentProject};
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => DispatchActions.getProjects(dispatch),
    setCurrentProject: (projectId) => DispatchActions.setProject(dispatch, projectId)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(Projects);

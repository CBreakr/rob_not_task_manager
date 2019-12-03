
import { ActionTypes } from "./Actions";

const initialState = {
  currentUser: null,
  projects: []
};

const rootReducer = (state = initialState, action) => {

  let newState = {...state};

  switch(action.type){
    case ActionTypes.RECEIVE_USER:
      console.log("receive user", {user:action.user});
      newState.currentUser = action.user;
      break;
    case ActionTypes.LOGOUT_USER:
      console.log("logout");
      // just replace everything
      newState = initialState;
      break;
    case ActionTypes.RECEIVE_PROJECT_LIST:
      console.log("projects", {projects:action.projects}, {id:action.projectId});
      newState.projects = action.projects;
      // if it's null, then this will be undefined
      newState.currentProject = newState.projects.find(project => project._id == action.projectId);
      console.log("current project", {current:newState.currentProject});
      newState.editProject = null;
      break;
    case ActionTypes.SET_CURRENT_PROJECT:
      newState.currentProject = newState.projects.find(project => project._id == action.projectId);
      newState.editProject = null;
      break;
    default:
      ;
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

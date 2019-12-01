
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
      console.log("projects", {projects:action.projects});
      newState.projects = action.projects;
      // if it's null, then this will be undefined
      newState.currentProject = newState.projects.find(project => project._id === action.projectId);
      break;
    case ActionTypes.ADD_NEW_PROJECT:
      newState.projects = [...newState.projects, action.project];
      break;
    case ActionTypes.SET_CURRENT_PROJECT:
      newState.currentProject = action.project;
      break;
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

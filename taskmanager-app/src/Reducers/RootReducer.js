
export const ReducerActionTypes = {
  RECEIVE_USER:"RECIEVE_USER",
  LOGOUT_USER:"LOGOUT_USER",
  RECEIVE_PROJECTS:"RECEIVE_PROJECTS",
  SET_CURRENT_PROJECT:"SET_CURRENT_PROJECT",
  RECEIVE_LISTS:"RECEIVE_LISTS",
  SET_CURRENT_LIST:"SET_CURRENT_LIST"
};

const initialState = {
  currentUser: null,
  projects: []
};

const rootReducer = (state = initialState, action) => {

  let newState = {...state};

  switch(action.type){
    case ReducerActionTypes.RECEIVE_USER:
      console.log("receive user", {user:action.user});
      newState.currentUser = action.user;
      break;
    case ReducerActionTypes.LOGOUT_USER:
      console.log("logout");
      // just replace everything
      newState = initialState;
      break;
    case ReducerActionTypes.RECEIVE_PROJECTS:
      console.log("projects", {projects:action.projects}, {id:action.projectId});
      newState.projects = action.projects;
      // if it's null, then this will be undefined
      newState.currentProject = newState.projects.find(project => project._id == action.projectId);
      console.log("current project", {current:newState.currentProject});
      break;
    case ReducerActionTypes.SET_CURRENT_PROJECT:
      newState.currentProject = newState.projects.find(project => project._id == action.projectId);
      break;
    case ReducerActionTypes.RECEIVE_LISTS:
      newState.lists = action.lists;
      newState.currentList = newState.lists.find(list => list._id == action.listId);
      break;
    case ReducerActionTypes.SET_CURRENT_LIST:
      newState.currentList = newState.lists.find(list => list._id == action.listId);
      break;
    default:
      ;
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

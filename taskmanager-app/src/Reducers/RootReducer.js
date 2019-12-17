
export const ReducerActionTypes = {
  RECEIVE_USER:"RECIEVE_USER",
  LOGOUT_USER:"LOGOUT_USER",
  RECEIVE_PROJECTS:"RECEIVE_PROJECTS",
  SET_CURRENT_PROJECT:"SET_CURRENT_PROJECT",
  RECEIVE_LISTS:"RECEIVE_LISTS",
  SET_CURRENT_LIST:"SET_CURRENT_LIST",
  RECEIVE_TASKS:"RECEIVE_TASKS",
  SET_CURRENT_TASK:"SET_CURRENT_TASK"
};

const initialState = {
  currentUser: null,
  projects: []
};

//
// let's update the store
//
const rootReducer = (state = initialState, action) => {

  let newState = {...state};

  switch(action.type){
    case ReducerActionTypes.RECEIVE_USER:
      // set the current user
      newState.currentUser = action.user;
      break;
    case ReducerActionTypes.LOGOUT_USER:
      // just replace everything with the initial state
      newState = initialState;
      break;
    case ReducerActionTypes.RECEIVE_PROJECTS:
      // clear all elements, then set projects
      newState.currentProject = null; //newState.projects.find(project => project._id == action.projectId);
      newState.lists = null;
      newState.tasks = null;
      newState.currentList = null;
      newState.currentTask = null;
      newState.projects = action.projects;
      break;
    case ReducerActionTypes.SET_CURRENT_PROJECT:
      // clear lists and tasks, then set current project by id match
      newState.lists = null;
      newState.tasks = null;
      newState.currentList = null;
      newState.currentTask = null;
      newState.currentProject = newState.projects.find(project => project._id == action.projectId);
      break;
    case ReducerActionTypes.RECEIVE_LISTS:
      // clear tasks and current list
      // then set lists
      newState.currentList = null; // newState.lists.find(list => list._id == action.listId);
      newState.tasks = null;
      newState.currentTask = null;
      newState.lists = action.lists;
      break;
    case ReducerActionTypes.SET_CURRENT_LIST:
      // clear tasks, then set current list by id match
      newState.currentTask = null;
      newState.currentList = newState.lists.find(list => list._id == action.listId);
      break;
    case ReducerActionTypes.RECEIVE_TASKS:
      // clear current task, then set tasks
      newState.currentTask = null; //newState.tasks.find(list => list._id == action.taskId);
      newState.tasks = action.tasks;
      break;
    case ReducerActionTypes.SET_CURRENT_TASK:
      // just set the current task
      newState.currentTask = newState.tasks.find(list => list._id == action.taskId);
      break;
    default:
      ;
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

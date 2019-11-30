
import { ActionTypes } from "./Actions";

const initialState = {
  currentUser: null
};

const rootReducer = (state = initialState, action) => {

  let newState = {...state};

  if(action.type === ActionTypes.RECEIVE_USER){
    console.log("receive user", {user:action.user});
    newState.currentUser = action.user;
  }
  else if(action.type === ActionTypes.REMOVE_USER){
    console.log("logout");
    newState.currentUser = null;
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

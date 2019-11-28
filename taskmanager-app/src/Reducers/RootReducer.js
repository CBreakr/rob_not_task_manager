
import { ActionTypes } from "./Actions";

const initialState = {
  testVal: "Q"
};

const rootReducer = (state = initialState, action) => {

  let newState = {...state};

  console.log({state});

  if(action.type === ActionTypes.TEST){
    console.log("action type TEST");
    newState.testVal = "TEST";
  }

  console.log("reducer", {newState});

  return newState;
};

export default rootReducer;

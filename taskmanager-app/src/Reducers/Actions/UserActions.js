
import { ReducerActionTypes as ActionTypes } from "../RootReducer";

import ProjectDispatchActions from "./ProjectActions";

const headers = {
  "Content-Type":"application/json"
};

const DispatchActions = {
  getUser: dispatch => {
    fetch("/api/checkUser")
    .then(res => res.json())
    .then(data => {
      if(data.user){
        dispatch({type:ActionTypes.RECEIVE_USER, user:data.user});
        ProjectDispatchActions.getProjects(dispatch);
      }
    })
    .catch(err => console.log("error on user check", {err}));
  },
  login: (dispatch, user) => {
    fetch("/api/login", {
      method:"POST",
      headers,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      if(data.user){
        dispatch({type:ActionTypes.RECEIVE_USER, user:data.user})
        ProjectDispatchActions.getProjects(dispatch);
      }
    })
    .catch(err => console.log("error on login", {err}));
  },
  register: (dispatch, newUser) =>{
    fetch("/api/register", {
      method:"POST",
      headers,
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      if(data.user){
        dispatch({type:ActionTypes.RECEIVE_USER, user:data.user});
      }
    })
    .catch(err => console.log("error on register", {err}));
  },
  logout: (dispatch) => {
    fetch("/api/login/logout")
    .then(res => res.json())
    .then(data => {
      // the return value doesn't matter
      dispatch({type:ActionTypes.LOGOUT_USER});
    })
    .catch(err => console.log("error on logout", {err}));
  }
};

export default DispatchActions;

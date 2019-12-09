
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
  },
  findUserByEmail: (dispatch, userEmail, callback) => {
    console.log("let's find the user by email", {userEmail});
    fetch("/api/user/finduserbyemail", {
      method:"POST",
      headers,
      body: JSON.stringify({userEmail})
    })
    .then(res => res.json())
    .then(data => {
      console.log("what did we find?", {data});
      if(callback && typeof callback === "function"){
        callback(data.user);
      }
    })
    .catch(err => console.log("error finding user", {err}));
  },
  setUserAccessForProject: (dispatch, currentProject, foundUser, accessLevel) => {
    console.log("set the access level of the user for project");
    const input = {currentProject, foundUser, accessLevel};

    console.log(input);

    fetch("/api/user/setuseraccess", {
      method:"POST",
      headers,
      body: JSON.stringify(input)
    })
    .then(res => res.json())
    .then(data => {
      console.log("set access result", {data});
    })
    .catch(err => console.log("error finding user", {err}));
  }
};

export default DispatchActions;


import { ReducerActionTypes as ActionTypes } from "../RootReducer";

import ProjectDispatchActions from "./ProjectActions";

const headers = {
  "Content-Type":"application/json"
};

//
// expose this to the outside
//
const DispatchActions = {
  getUser,
  login,
  register,
  logout,
  findUserByEmail,
  setUserAccessForProject
};

//
// call to api
// check if we have an active user session
// if so, get any projects they have access to
//
function getUser(dispatch) {
  fetch("/api/checkUser")
  .then(res => res.json())
  .then(data => {
    if(data.user){
      dispatch({type:ActionTypes.RECEIVE_USER, user:data.user});
      ProjectDispatchActions.getProjects(dispatch);
    }
  })
  .catch(err => console.log("error on user check", {err}));
}

//
// call to api
// authenticate the specified user
// then get any projects they have access to
//
function login(dispatch, user) {
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
}

//
// call to api
// register a new user
//
function register(dispatch, newUser) {
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
}

//
// call to api
// log the user out
//
function logout(dispatch) {
  fetch("/api/login/logout")
  .then(res => res.json())
  .then(data => {
    // the return value doesn't matter
    dispatch({type:ActionTypes.LOGOUT_USER});
  })
  .catch(err => console.log("error on logout", {err}));
}

//
// call to api
// find the user within the DB
// who matches the specified email
//
function findUserByEmail(dispatch, userEmail, callback) {
  fetch("/api/user/finduserbyemail", {
    method:"POST",
    headers,
    body: JSON.stringify({userEmail})
  })
  .then(res => res.json())
  .then(data => {
    if(callback && typeof callback === "function"){
      callback(data.user);
    }
  })
  .catch(err => console.log("error finding user", {err}));
}

//
// call to api
// set the foundUser to have access to
// the currentProject
//
function setUserAccessForProject(dispatch, currentProject, foundUser, accessLevel) {
  const input = {currentProject, foundUser, accessLevel};
  fetch("/api/user/setuseraccess", {
    method:"POST",
    headers,
    body: JSON.stringify(input)
  })
  .then(res => res.json())
  .then(data => {
    console.log("use access set");
  })
  .catch(err => console.log("error finding user", {err}));
}

//
// EXPORT
//
export default DispatchActions;

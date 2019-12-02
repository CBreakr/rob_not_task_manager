
export const ActionTypes = {
  RECEIVE_USER:"RECIEVE_USER",
  LOGOUT_USER:"LOGOUT_USER",
  RECEIVE_PROJECT_LIST:"RECEIVE_PROJECT_LIST",
  SET_CURRENT_PROJECT:"SET_CURRENT_PROJECT",
  SET_PROJECT_EDIT_MODE:"SET_PROJECT_EDIT_MODE"
};

const headers = {
  "Content-Type":"application/json"
};

export const DispatchActions = {
  getUser: dispatch => {
    fetch("/api/checkUser")
    .then(res => res.json())
    .then(data => {
      if(data.user){
        dispatch({type:ActionTypes.RECEIVE_USER, user:data.user});
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
        DispatchActions.getProjects(dispatch);
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
  getProjects: (dispatch, selectId) => {
    fetch("/api/project")
    .then(res => res.json())
    .then(data => {
      // the project list
      console.log("new project id", {selectId});
      dispatch({type:ActionTypes.RECEIVE_PROJECT_LIST, projects:data.projects, projectId:selectId});
    })
    .catch(err => console.log("error getting project list", {err}));
  },
  setProject: (dispatch, projectId) => {
    dispatch({type:ActionTypes.SET_CURRENT_PROJECT, projectId});
  },
  upsertProject: (dispatch, project) => {
    if(!project._id){
      DispatchActions.createProject(dispatch, project);
    }
    else{
      DispatchActions.updateProject(dispatch, project);
    }
  },
  createProject: (dispatch, project) => {
    fetch("/api/project", {
      method:"POST",
      headers,
      body: JSON.stringify({project})
    })
    .then(res => res.json())
    .then(data => {
      // I should get all projects and also return the current id
      DispatchActions.getProjects(dispatch, data.newProject._id);
    })
    .catch(err => console.log("error creating new project", {err}));
  },
  updateProject: (dispatch, project) => {
    fetch("/api/project", {
      method:"PUT",
      headers,
      body: JSON.stringify({project})
    })
    .then(res => res.json())
    .then(data => {
      // get all projects
      // this can only be done to the active project
      // so we'll pass along the id to maintain that
      DispatchActions.getProjects(dispatch, data._id);
    })
    .catch(err => console.log("error updating project", {err}));
  }
};

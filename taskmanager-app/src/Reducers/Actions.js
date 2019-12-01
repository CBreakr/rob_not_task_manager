
export const ActionTypes = {
  RECEIVE_USER:"RECIEVE_USER",
  LOGOUT_USER:"LOGOUT_USER",
  RECEIVE_PROJECT_LIST:"RECEIVE_PROJECT_LIST",
  ADD_NEW_PROJECT:"ADD_NEW_PROJECT",
  SET_CURRENT_PROJECT:"SET_CURRENT_PROJECT"
};

const headers = {
  "Content-Type":"application/json"
};

export const DispatchActions = {
  getUser: dispatch => {
    fetch("/api/checkUser")
    .then(res => res.json())
    .then(data => {
      console.log("get user", {data});
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
      console.log("login", {data});
      if(data.user){
        dispatch({type:ActionTypes.RECEIVE_USER, user:data.user});
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
      console.log("register", {data})
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

    console.log("get Projects");

    fetch("/api/project")
    .then(res => res.json())
    .then(data => {
      // the project list
      dispatch({type:ActionTypes.RECEIVE_PROJECT_LIST, projects:data.projects, projectid:selectId});
    })
    .catch(err => console.log("error getting project list", {err}));
  },
  setProject: (dispatch, project) => {
    console.log("set project", {project});
    dispatch({type:ActionTypes.SET_CURRENT_PROJECT, project});
  },
  upsertProject: (dispatch, project) => {
    console.log("upsert", {project});
    if(!project._id){
      DispatchActions.createProject(dispatch, project);
    }
    else{
      DispatchActions.updateProject(dispatch, project);
    }
  },
  createProject: (dispatch, project) => {
    console.log("new project", {project});

    fetch("/api/project", {
      method:"POST",
      headers,
      body: JSON.stringify({project})
    })
    .then(res => res.json())
    .then(data => {
      // I should get all projects and also return the current id
      DispatchActions.getProjects(dispatch, data._id);
    })
    .catch(err => console.log("error creating new project", {err}));
  },
  updateProject: (dispatch, project) => {
    console.log("update project", {project});

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


export const ActionTypes = {
  RECEIVE_USER:"RECIEVE_USER",
  LOGOUT_USER:"LOGOUT_USER",
  RECEIVE_PROJECTS:"RECEIVE_PROJECTS",
  SET_CURRENT_PROJECT:"SET_CURRENT_PROJECT",
  RECEIVE_LISTS:"RECEIVE_LISTS",
  SET_CURRENT_LIST:"SET_CURRENT_LIST"
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
      console.log("selected project id", {selectId});
      dispatch({type:ActionTypes.RECEIVE_PROJECTS, projects:data.projects, projectId:selectId});
    })
    .catch(err => console.log("error getting project list", {err}));
  },
  setProject: (dispatch, projectId) => {
    dispatch({type:ActionTypes.SET_CURRENT_PROJECT, projectId});
    // also get the lists
    DispatchActions.getLists(dispatch, projectId);
  },
  upsertProject: (dispatch, project) => {
    if(project._id){
      DispatchActions.updateProject(dispatch, project);
    }
    else{
      DispatchActions.createProject(dispatch, project);
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
      DispatchActions.getProjects(dispatch, project._id);
    })
    .catch(err => console.log("error updating project", {err}));
  },
  deleteProject: (dispatch, projectId) => {
    fetch(`/api/project/${projectId}`, {
      method:"DELETE",
      headers
    })
    .then(res => res.json())
    .then(result => {
      DispatchActions.getProjects(dispatch);
    })
    .catch(err => console.log("error deleting project", {err}));
  },
  getLists: (dispatch, projectId, selectId) => {
    console.log("get lists for project", {projectId, selectId});
    fetch(`/api/list/byproject/${projectId}`)
    .then(res => res.json())
    .then(data => {
      console.log("get lists by project", {data});
      dispatch({type:ActionTypes.RECEIVE_LISTS, lists:data.lists, listId:selectId});
    })
    .catch(err => console.log("error getting lists by project", {err}));
  },
  upsertList: (dispatch, list, projectId) => {
    if(list._id){
      DispatchActions.updateList(dispatch, list, projectId);
    }
    else{
      DispatchActions.createList(dispatch, list, projectId);
    }
  },
  createList: (dispatch, list, projectId) => {
    console.log("create list", {list, projectId});
    fetch("/api/list", {
      method:"POST",
      headers,
      body: JSON.stringify({list, projectId})
    })
    .then(res => res.json())
    .then(data => {
      DispatchActions.getLists(dispatch, projectId, data.newList._id);
    })
    .catch(err => console.log("error creating list", {err}));
  },
  updateList: (dispatch, list) => {
    fetch("/api/list", {
      method:"PUT",
      headers,
      body: JSON.stringify({list})
    })
    .then(res => res.json())
    .then(data => {
      DispatchActions.getLists(dispatch, list.parentProject, list._id);
    })
    .catch(err => console.log("error updating list", {err}));
  },
  setList: (dispatch, listId) => {
    console.log("set active list", {listId});
    dispatch({type:ActionTypes.SET_CURRENT_LIST, listId});
  },
  deleteList: (dispatch, list) => {
    console.log("delete list", {list});
    fetch(`/api/list/${list._id}`, {
      method:"DELETE",
      headers
    })
    .then(res => res.json())
    .then(data => {
      DispatchActions.getLists(dispatch, list.parentProject);
    })
    .catch(err => console.log("error deleting list", {err}));
  }
};

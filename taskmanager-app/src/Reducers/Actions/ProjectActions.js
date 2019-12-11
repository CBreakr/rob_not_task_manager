
import { ReducerActionTypes as ActionTypes } from "../RootReducer";
import ListDispatchActions from "./ListActions";

const headers = {
  "Content-Type":"application/json"
};

const DispatchActions = {
  getProjects: (dispatch, selectId) => {
    fetch("/api/project")
    .then(res => res.json())
    .then(data => {
      // the project list
      console.log("selected project id", {selectId});
      data.projects.map(project => {
        console.log({project}, {properties:Object.getOwnPropertyNames(project)}, {isAdmin:project.isAdmin});
      });
      dispatch({type:ActionTypes.RECEIVE_PROJECTS, projects:data.projects});
      if(selectId){
        DispatchActions.setProject(dispatch, selectId);
      }
    })
    .catch(err => console.log("error getting project list", {err}));
  },
  setProject: (dispatch, projectId) => {
    dispatch({type:ActionTypes.SET_CURRENT_PROJECT, projectId});
    // also get the lists
    ListDispatchActions.getLists(dispatch, projectId);
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
  }
};

export default DispatchActions;

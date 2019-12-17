
import { ReducerActionTypes as ActionTypes } from "../RootReducer";
import ListDispatchActions from "./ListActions";

const headers = {
  "Content-Type":"application/json"
};

//
// expose this to the outside
//
const DispatchActions = {
  getProjects,
  setProject,
  upsertProject,
  createProject,
  updateProject,
  deleteProject
};

//
// call to the api
// to get the projects for the current user
// followed by setting the current project if it's been selected
//
function getProjects(dispatch, selectId) {
  fetch("/api/project")
  .then(res => res.json())
  .then(data => {
    // the project list
    dispatch({type:ActionTypes.RECEIVE_PROJECTS, projects:data.projects});
    if(selectId){
      DispatchActions.setProject(dispatch, selectId);
    }
  })
  .catch(err => console.log("error getting project list", {err}));
}

//
// call to the dispatch actions
// pass the id of the project to select
// and then get the lists for that project
//
function setProject(dispatch, projectId) {
  dispatch({type:ActionTypes.SET_CURRENT_PROJECT, projectId});
  // also get the lists
  ListDispatchActions.getLists(dispatch, projectId);
}

//
// if the project has an id, run update
// if not, run create
//
function upsertProject(dispatch, project) {
  if(project._id){
    DispatchActions.updateProject(dispatch, project);
  }
  else{
    DispatchActions.createProject(dispatch, project);
  }
}

//
// call to the api
// create a new project in the DB
// then get all projects
//
function createProject(dispatch, project) {
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
}

//
// call to the api
// update the db with the project passed in
// then get all projects
//
function updateProject(dispatch, project) {
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
}

//
// call to the api
// delete the project by the id passed in
// then get all projects
//
function deleteProject(dispatch, projectId) {
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

//
// EXPORT
//
export default DispatchActions;

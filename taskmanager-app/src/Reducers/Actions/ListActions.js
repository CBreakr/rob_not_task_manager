
import { ReducerActionTypes as ActionTypes } from "../RootReducer";
import TaskDispatchActions from "./TaskActions";

const headers = {
  "Content-Type":"application/json"
};

//
// expose this to the outside
//
const DispatchActions = {
  getLists,
  setList,
  upsertList,
  createList,
  updateList,
  deleteList
};

//
// call to the api
// to get the lists by the specified project
// followed by setting the current list if it's been selected
//
function getLists(dispatch, projectId, selectId){
  fetch(`/api/list/byproject/${projectId}`)
  .then(res => res.json())
  .then(data => {
    dispatch({type:ActionTypes.RECEIVE_LISTS, lists:data.lists});
    if(selectId){
      DispatchActions.setList(dispatch, selectId);
    }
  })
  .catch(err => console.log("error getting lists by project", {err}));
}

//
// call to the dispatch actions
// pass the id of the list to select
// and then get the tasks for that list
//
function setList(dispatch, listId) {
  dispatch({type:ActionTypes.SET_CURRENT_LIST, listId});
  TaskDispatchActions.getTasks(dispatch, listId);
}

//
// if the list has an id, run update
// if not, run create
//
function upsertList(dispatch, list, projectId) {
  if(list._id){
    DispatchActions.updateList(dispatch, list, projectId);
  }
  else{
    DispatchActions.createList(dispatch, list, projectId);
  }
}

//
// call to the api
// create a new list in the DB
// then get all lists
//
function createList(dispatch, list, projectId) {
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
}

//
// call to the api
// update the db with the list passed in
// then get all lists
//
function updateList(dispatch, list) {
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
}

//
// call to the api
// delete the list by the id passed in
// then get all lists
//
function deleteList(dispatch, list) {
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

//
// EXPORT
//
export default DispatchActions;

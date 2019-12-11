
import { ReducerActionTypes as ActionTypes } from "../RootReducer";
import TaskDispatchActions from "./TaskActions";

const headers = {
  "Content-Type":"application/json"
};

const DispatchActions = {
  getLists: (dispatch, projectId, selectId) => {
    console.log("get lists for project", {projectId, selectId});
    fetch(`/api/list/byproject/${projectId}`)
    .then(res => res.json())
    .then(data => {
      console.log("get lists by project", {data});
      dispatch({type:ActionTypes.RECEIVE_LISTS, lists:data.lists});
      if(selectId){
        DispatchActions.setList(dispatch, selectId);
      }
    })
    .catch(err => console.log("error getting lists by project", {err}));
  },
  setList: (dispatch, listId) => {
    console.log("set active list", {listId});
    dispatch({type:ActionTypes.SET_CURRENT_LIST, listId});
    TaskDispatchActions.getTasks(dispatch, listId);
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

export default DispatchActions;

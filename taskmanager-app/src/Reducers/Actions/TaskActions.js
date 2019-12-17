
import { ReducerActionTypes as ActionTypes } from "../RootReducer";

const headers = {
  "Content-Type":"application/json"
};

//
// expose this to the outside
//
const DispatchActions = {
  getTasks,
  setTask,
  upsertTask,
  createTask,
  updateTask,
  deleteTask
};

//
// call to the api
// to get the tasks for the specified list
// followed by setting the current task if it's been selected
//
function getTasks(dispatch, listId, selectId) {
  fetch(`/api/task/bylist/${listId}`)
  .then(res => res.json())
  .then(data => {
    dispatch({type:ActionTypes.RECEIVE_TASKS, tasks:data.tasks});
    if(selectId){
      DispatchActions.setTask(dispatch, selectId);
    }
  })
  .catch(err => console.log("error getting tasks by list", {err}));
}

//
// call to the dispatch actions
// pass the id of the task to select
//
function setTask(dispatch, taskId) {
  dispatch({type:ActionTypes.SET_CURRENT_TASK, taskId});
}

//
// if the list has an id, run update
// if not, run create
//
function upsertTask(dispatch, task, listId) {
  if(task._id){
    DispatchActions.updateTask(dispatch, task, listId);
  }
  else{
    DispatchActions.createTask(dispatch, task, listId);
  }
}

//
// call to the api
// create a new task in the DB
// then get all tasks
//
function createTask(dispatch, task, listId) {
  fetch("/api/task", {
    method:"POST",
    headers,
    body: JSON.stringify({task, listId})
  })
  .then(res => res.json())
  .then(data => {
    DispatchActions.getTasks(dispatch, listId, data.newTask._id);
  })
  .catch(err => console.log("error creating task", {err}));
}

//
// call to the api
// update the db with the task passed in
// then get all tasks
//
function updateTask(dispatch, task) {
  fetch("/api/task", {
    method:"PUT",
    headers,
    body: JSON.stringify({task})
  })
  .then(res => res.json())
  .then(data => {
    DispatchActions.getTasks(dispatch, task.parentList, task._id);
  })
  .catch(err => console.log("error updating task", {err}));
}

//
// call to the api
// delete the task by the id passed in
// then get all tasks
//
function deleteTask(dispatch, task) {
  fetch(`/api/task/${task._id}`, {
    method:"DELETE",
    headers
  })
  .then(res => res.json())
  .then(data => {
    DispatchActions.getTasks(dispatch, task.parentList);
  })
  .catch(err => console.log("error deleting task", {err}));
}

//
// EXPORT
//
export default DispatchActions;

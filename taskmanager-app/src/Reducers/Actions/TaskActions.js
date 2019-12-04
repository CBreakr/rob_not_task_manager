
import { ReducerActionTypes as ActionTypes } from "../RootReducer";

const headers = {
  "Content-Type":"application/json"
};

const DispatchActions = {
  getTasks: (dispatch, listId, selectId) => {
    console.log("get tasks for list", {listId, selectId});
    fetch(`/api/task/bylist/${listId}`)
    .then(res => res.json())
    .then(data => {
      console.log("get tasks by list", {data});
      dispatch({type:ActionTypes.RECEIVE_TASKS, tasks:data.tasks, taskId:selectId});
    })
    .catch(err => console.log("error getting tasks by list", {err}));
  },
  upsertTask: (dispatch, task, listId) => {
    if(task._id){
      DispatchActions.updateTask(dispatch, task, listId);
    }
    else{
      DispatchActions.createTask(dispatch, task, listId);
    }
  },
  createTask: (dispatch, task, listId) => {
    console.log("create task", {task, listId});
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
  },
  updateTask: (dispatch, task) => {
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
  },
  setTask: (dispatch, taskId) => {
    console.log("set active task", {taskId});
    dispatch({type:ActionTypes.SET_CURRENT_TASK, taskId});
  },
  deleteTask: (dispatch, task) => {
    console.log("delete task", {task});
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
};

export default DispatchActions;

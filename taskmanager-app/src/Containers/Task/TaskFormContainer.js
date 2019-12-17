
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/TaskActions";

import TaskForm from "../../Components/Task/TaskForm";

/*
pass along:
- current list
- upsert task method
*/

const mapStateToProps = (state) => {
  return {
    list: {...state.currentList}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertTask: (task, listId) => {DispatchActions.upsertTask(dispatch, task, listId)}
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(TaskForm);


import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/TaskActions";

import TaskForm from "../../Components/Task/TaskForm";

const mapStateToProps = (state) => {
  console.log("current list", {list: state.currentList});
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


import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/TaskActions";

import ActiveTask from "../../Components/Task/ActiveTask";

/*
pass along:
- current project
- delete task method
*/

const mapStateToProps = (state) => {
  return {
    project: {...state.currentProject}
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (task) => DispatchActions.deleteTask(dispatch, task)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveTask);

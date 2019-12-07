
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/TaskActions";

import ActiveTask from "../../Components/Task/ActiveTask";

const mapStateToProps = (state) => {
  const props = {};

  // console.log("current task selected?", {state});
  //
  // if(state.currentTask){
  //   props.task = {...state.currentTask};
  // }
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (task) => DispatchActions.deleteTask(dispatch, task)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveTask);

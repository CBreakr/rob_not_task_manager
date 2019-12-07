
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/TaskActions";

import Tasks from "../../Components/Task/Tasks";

const mapStateToProps = (state) => {
  const props = {
    list: null,
    tasks: null,
    currentTask: null
  }

  if(state.currentList) {
    props.list = state.currentList;
    if(state.tasks){
      props.tasks = [...state.tasks];
    }

    if(state.currentTask) {
      props.currentTask = {...state.currentTask};
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks: (list) => DispatchActions.getTasks(dispatch, list),
    setCurrentTask: (taskId) => DispatchActions.setTask(dispatch, taskId)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(Tasks);

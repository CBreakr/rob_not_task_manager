
import { connect } from "react-redux";

import TaskScreen from "../../Components/Task/TaskScreen";

/*
pass along:
- current project
- current list
*/

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentProject){
    props.currentProject = state.currentProject;
    if(state.currentList){
      props.listSelected = true;
    }
  }
  return props;
}

const enhancer = connect(mapStateToProps, null);

export default enhancer(TaskScreen);

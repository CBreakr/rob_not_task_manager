
import { connect } from "react-redux";

import TaskScreen from "../../Components/Task/TaskScreen";

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentList){
    props.listSelected = true;
  }
  return props;
}

const enhancer = connect(mapStateToProps, null);

export default enhancer(TaskScreen);

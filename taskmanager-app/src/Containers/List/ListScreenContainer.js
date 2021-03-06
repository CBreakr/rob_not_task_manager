
import { connect } from "react-redux";

import ListScreen from "../../Components/List/ListScreen";

/*
pass along:
- current project
*/

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentProject){
    props.currentProject = state.currentProject;
  }
  return props;
}

const enhancer = connect(mapStateToProps, null);

export default enhancer(ListScreen);

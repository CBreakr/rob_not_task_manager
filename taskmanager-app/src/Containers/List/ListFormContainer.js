
import { connect } from "react-redux";

import { DispatchActions } from "../../Reducers/Actions";

import ListForm from "../../Components/List/ListForm";

const mapStateToProps = (state) => {
  console.log("current project", {project: state.currentProject});
  return {
    project: {...state.currentProject}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertList: (list, projectId) => {console.log("in upsert", {list, projectId}); DispatchActions.upsertList(dispatch, list, projectId)}
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ListForm);


import { connect } from "react-redux";

import { DispatchActions } from "../../Reducers/Actions";

import ListForm from "../../Components/List/ListForm";

const mapStateToProps = (state) => {
  return {
    project: {...state.currentProject}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertList: (list, projectId) => DispatchActions.upsertList(dispatch, list, projectId)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ListForm);

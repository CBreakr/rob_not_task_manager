
import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import ProjectForm from "../Components/ProjectForm";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    upsertProject: (project) => DispatchActions.upsertProject(dispatch, project)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ProjectForm);

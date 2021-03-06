
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/ProjectActions";

import ProjectForm from "../../Components/Project/ProjectForm";

/*
pass along:
- upsert project
*/

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

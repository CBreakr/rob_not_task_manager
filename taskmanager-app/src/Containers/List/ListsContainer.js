
import { connect } from "react-redux";

import DispatchActions from "../../Reducers/Actions/ListActions";

import Lists from "../../Components/List/Lists";

const mapStateToProps = (state) => {
  const props = {
    project: null,
    lists: null,
    currentList: null
  }

  if(state.currentProject) {
    props.project = state.currentProject;
    if(state.lists){
      props.lists = [...state.lists];
    }

    if(state.currentList) {
      props.currentList = {...state.currentList};
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLists: (project) => DispatchActions.getLists(dispatch, project),
    setCurrentList: (listId) => DispatchActions.setList(dispatch, listId)
  }
};

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(Lists);


import { connect } from "react-redux";

import { DispatchActions } from "../Reducers/Actions";

import ActiveList from "../Components/ActiveList";

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentList){
    props.list = {...state.currentList};
  }
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (listId) => DispatchActions.deleteList(dispatch, listId)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveList);

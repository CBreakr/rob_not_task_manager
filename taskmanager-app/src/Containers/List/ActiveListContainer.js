
import { connect } from "react-redux";

import { DispatchActions } from "../../Reducers/Actions";

import ActiveList from "../../Components/List/ActiveList";

const mapStateToProps = (state) => {
  const props = {};
  if(state.currentList){
    props.list = {...state.currentList};
  }
  return props;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteList: (list) => DispatchActions.deleteList(dispatch, list)
  };
}

const enhancer = connect(mapStateToProps, mapDispatchToProps);

export default enhancer(ActiveList);

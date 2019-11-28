
export const ActionTypes = {
  TEST: "TEST"
};

export const DispatchActions = {
  testTrigger: dispatch => {
    console.log("test action called");
    dispatch(DispatchActions.testAction());
  },
  testAction: () => {
    return {
      type: ActionTypes.TEST,
      value: "AAA"
    };
  }
};

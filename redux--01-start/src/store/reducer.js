import * as actionTypes from './actions';
const initialState = {
  counter: 0,
  results: []
}
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.INCREMENT:
      const newState = Object.assign({}, state); // not a deep clone
      newState.counter = state.counter + 1;
      return newState;
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      }
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.val
      }
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.val
      }
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: state.counter})
      }
    case actionTypes.DELETE_RESULT:
      // const id = 2;
      // const newArray = [...state.results]; // ok at object level
      // newArray.splice(id, 1);
      // state.results.splice(id, 1); // mutates
      const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
      return {
        ...state,
        results: updatedArray
      }
  }
  return state;
}

export default reducer;
import * as actionTypes from '../actions';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        results: state.results.concat({id: new Date(), value: action.result})
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
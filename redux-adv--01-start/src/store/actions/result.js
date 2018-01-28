import * as actionTypes from './actionTypes';

export const saveResult = result => {
  const updatedResult = result * 2;
  return {
    type: actionTypes.STORE_RESULT,
    result: updatedResult
  }
}

export const storeResult = result => {
  return dispatch => {
    setTimeout(() => {
      dispatch(saveResult(result));
    }, 5000);
  }
}

export const deleteResult = id => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultElId: id
  }
}
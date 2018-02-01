import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    console.log('authData -----', authData);
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCQRwknC4Lligf_dvUlW9sb4Vg4Ntwp3zo',
    authData, { 'Content-Type': 'applicaton/json' })
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error))
    });
  }
}
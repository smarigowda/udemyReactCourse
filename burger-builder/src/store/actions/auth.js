import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expiresIn, logout) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, +expiresIn * 1000)
  }
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    console.log('authData -----', authData);
    console.log('isSignUp ---- ', isSignUp);
    console.log('process----', process);
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    if(isSignUp) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }

    axios.post(url,
    authData, { 'Content-Type': 'applicaton/json' })
    .then(response => {
      console.log(response);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn, logout));
    })
    .catch(error => {
      console.log("---- error ----", error);
      console.log("---- error.response ----", error.response);
      dispatch(authFail(error.response.data.error))
    });
  }
}
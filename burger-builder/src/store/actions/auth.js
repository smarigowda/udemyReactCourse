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
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    // type: actionTypes.AUTH_LOGOUT,
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const checkAuthTimeout = expiresIn => {
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
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      console.log("---- error ----", error);
      console.log("---- error.response ----", error.response);
      dispatch(authFail(error.response.data.error))
    });
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(checkAuthTimeout(expiresIn));
      } else {
        dispatch(logout());
      }
    }
  }
}
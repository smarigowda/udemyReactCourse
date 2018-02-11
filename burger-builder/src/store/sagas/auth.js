import { delay } from 'redux-saga';
import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucced());
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}
export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  }
  console.log('authData -----', authData);
  console.log('isSignUp ---- ', action.isSignUp);
  console.log('process----', process);
  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
  if(action.isSignUp) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
  }

  try {
    const response = yield axios.post(url, authData, { 'Content-Type': 'applicaton/json' })
    console.log(response);
    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
      console.log("---- error ----", error);
      console.log("---- error.response ----", error.response);
      yield put(action.authFail(error.response.data.error));
  }
}
export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
    if (!token) {
      yield put(actions.logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        yield put(actions.authSuccess(token, userId));
        const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
        yield put(actions.checkAuthTimeout(expiresIn));
      } else {
        yield put(actions.logout());
      }
    }
}

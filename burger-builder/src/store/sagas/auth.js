import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import { checkAuthTimeout } from '../actions/auth';

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
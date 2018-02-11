import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  try {
    yield put(actions.purchaseBurgerStart());
    const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    // error test
    // const response = yield axios.post('/orders', action.orderData);
    console.log(response);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
  } catch(error) {
    console.log(error);
    yield put(actions.purchaseBurgerFail(error));
  }
}

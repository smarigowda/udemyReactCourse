import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* initIngredientsSaga(action) {
  try {
    // success case
    const response = yield axios.get('https://react-my-burger-43a92.firebaseio.com/ingredients.json');
    // error case
    // .get('https://react-my-burger-43a92.firebaseio.com/ingredients')
    console.log(`ingredients state: ${JSON.stringify(response)}`);
    yield put(actions.setIngredients(response.data))
  } catch (error) {
    console.log(error);
    yield put(actions.fetchIngredientsFailed());
  }
}
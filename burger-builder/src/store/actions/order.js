import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData,
  }
}

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    console.log(orderData);
    axios.post('/orders.json', orderData)
    // axios.post('/orders', orderData) // error scenario
    .then(response => {
      console.log(response);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      // this.setState({loading: false});
      // this.props.history.push('/');
    }).catch(error => {
      // this.setState({loading: false});
      console.log(error);
      dispatch(purchaseBurgerFail(error));
    });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}


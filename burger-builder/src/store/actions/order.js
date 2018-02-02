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

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    console.log(orderData);
    axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  }
}

export const fetchOrders = (token) => {
  return (dispatch, getState) => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth=' + token)
    .then(res => {
      console.log(res.data);
      const fetchedOrders = [];
      for( let key in res.data) {
         fetchedOrders.push({
           ...res.data[key],
           id: key
         });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
      //  this.setState({ loading: false, orders: fetchedOrders });
    })
    .catch(error => {
    //  this.setState({ loading: false });
      dispatch(fetchOrdersFail(error));
    })
  }
}
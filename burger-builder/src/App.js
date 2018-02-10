import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
class App extends Component {
  componentDidMount() {
    this.props.autoSign();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.token) {
      routes = (
        <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/orders" component={asyncOrders}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to="/" />
      </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoSign: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
class App extends Component {
  // state = {
  //   show: true
  // }
  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   }, 20000);
  // }
  componentDidMount() {
    this.props.autoSign();
  }
  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          { this.props.token ? <Route path="/orders" component={Orders}/> : null }
          { this.props.token ? <Route path="/logout" component={Logout}/> : null }
          <Redirect to="/" />
        </Switch>
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

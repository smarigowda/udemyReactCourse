import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  }
  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }
  // commented because building = false and authRedirectPath !== '/' is not be possible.
  // componentDidMount() {
  //   debugger;
  //   if (!this.props.building && this.props.authRedirectPath !== '/') {
  //     // home -> add ing -> Sign In -> Logout -> Sign In ? 
  //     this.props.setAuthRedirectPath('/');
  //   }
  // }
  checkValidity = (value, rules) => {
    let isValid = true;
    // resiliency
    if(!rules) {
      return isValid;
    }
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    }
    this.setState({ controls: updatedControls });
  }
  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }
  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = formElementsArray.map(ele => (
      <Input 
        key={ele.id}
        elementType={ele.config.elementType}
        elementConfig={ele.config.elementConfig}
        value={ele.config.value}
        invalid={!ele.config.valid}
        shouldValidate={ele.config.validation}
        touched={ele.config.touched}
        changed={ (event) => {
          this.inputChangedHandler(event, ele.id);
        }
        }
      />
    ));
    if(this.props.loading) {
      form = <Spinner />;
      }
    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    let authRedirect = null;
    if (this.props.token !== null) { // component is re-rendered when token (one of auth state) is updated
      console.log('[Auth container] user is authenticated, redirecting to', this.props.authRedirectPath);
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    } else {
      console.log('---- token ---', this.props.token);
      console.log('[Auth container] user is not yet authenticated')
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{ this.state.isSignUp ? 'SIGN UP':'SIGN IN' }</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH</Button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    // setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

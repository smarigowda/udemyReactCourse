import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';

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
    }
  }
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
  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    const form = formElementsArray.map(ele => (
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
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;

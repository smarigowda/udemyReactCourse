import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-Mail',
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: ''
      }
    },
    loading: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);

    // alert('You Continue!');
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    }
    axios.post('/orders.json', order)
    // // axios.post('/orders', order) // error case
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
        console.log(response);
      }).catch(error => {
        this.setState({loading: false});
        console.log(error);
      });
  }
  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  }
  render() {
    // console.log(this.props);
    // debugger;
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form>
        {/* <Input elementType="..." elementConfig="..." value="..." /> */}
        {
          formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={ (event) => {
                  this.inputChangedHandler(event, formElement.id);
                }
                }
              />
            )
          })
        }
        {/* <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
        <Input inputtype="input" type="text" name="street" placeholder="Street" />
        <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" /> */}
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if(this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your conatact data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
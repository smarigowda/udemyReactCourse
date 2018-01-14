import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
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
      price: this.props.price,
      customer: {
        name: 'Santosh Marigowda',
        address: {
          street: 'Beaconsfield Way',
          postCode: 'RG6 5UR',
          country: 'UK'
        },
        email: 'santosharakere@gmail.com'
      },
      deliveryMethod: 'fastest'
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
  render() {
    // console.log(this.props);
    // debugger;
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
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
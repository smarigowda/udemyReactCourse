import React, {Component} from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions';

class BurgerBuilder extends Component {
  // constructor(props) {   super(props) {     this.state = {...}   } }

  // UI only state, no need to manage them by redux
  state = {
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount() { // has side effect
    console.log(this.props);
    // axios
    //   .get('https://react-my-burger-43a92.firebaseio.com/ingredients.json') // success case
    //   // .get('https://react-my-burger-43a92.firebaseio.com/ingredients') // error case
    //   .then(response => {
    //     console.log(`ingredients state: ${JSON.stringify(response)}`);
    //     this.setState({ingredients: response.data});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ error: true });
    //   });
  }
  purchaseHandler = () => {
    this.setState({purchasing: true});
  }
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }
  updatePurchaseState = ingredients => {
    const sum = Object
      .keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }
  // addIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceAdditon = INGREDIENT_PRICES[type];
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = oldPrice + priceAdditon;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = type => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.props.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner/>;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.totalPrice}/>;  
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onIngredientAdded: name => dispatch({ type: burgerBuilderActionTypes.ADD_INGREDIENT,  ingredientName: name }),
    // onIngredientRemoved: name => dispatch({ type: burgerBuilderActionTypes.REMOVE_INGREDIENT,  ingredientName: name })
    onIngredientAdded: name => dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: name => dispatch(burgerBuilderActions.removeIngredient(name))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
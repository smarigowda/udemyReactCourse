import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
                                       .map(ingKey => {
                                         return [...Array(props.ingredients[ingKey])].map((d,i) => {
                                           return <BurgerIngredient key={ingKey + i} type={ingKey} />
                                         });
                                       });
  console.log(transformedIngredients);
  // [ [x] [x, y] [x, y, z] [x] [x, y] [x, y, z, b]]
  const flattened = transformedIngredients.reduce((arr, ele) => { 
    return arr.concat(ele);
  }, []);
  // debugger;
  if(flattened.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;

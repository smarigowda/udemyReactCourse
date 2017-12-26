import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = props => {
  let btnClass = classes.Button;
  if(props.showPersons) {
    btnClass = [classes.red, classes.Button].join(' ');
  }

  const assignedClasses = [];

  if(props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if(props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    <Aux>
      <div>
        <h1>{props.appTitle}</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={props.clicked}>Toggle Persons</button>
      </div>
    </Aux>
  );
}

export default cockpit;
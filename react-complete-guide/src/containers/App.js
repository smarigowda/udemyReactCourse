import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';


class App extends Component {
  state = {
    persons: [ 
      { id: 'ajfjak', name: 'Santosh', age: 43 },
      { id: 'cnbnvc', name: 'Roopa', age: 40 },
      { id: 'wedjad', name: 'Sukruthi', age: 12 }
    ],
    otherState: 'Some other state',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(d => d.id === id);
    const person = {
      ...this.state.persons[personIndex]
    }
    // const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value;
    const persons = [ ...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons; // reference to originl array
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; // copy of original, we do not mutate original
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    let btnClass = '';


    if( this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
      />
      btnClass = classes.red;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
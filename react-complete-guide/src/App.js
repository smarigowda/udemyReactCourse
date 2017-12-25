import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
      persons = (
        <div>
          {this.state.persons.map((d, index) => {
            return (
              <ErrorBoundary key={d.id}>
                <Person
                  click={() => this.deletePersonHandler(index)}
                  name={d.name}
                  age={d.age}
                  changed={event => { this.nameChangeHandler(event, d.id) }} />
              </ErrorBoundary>
            )
          })}
        </div>
      )
      btnClass = classes.red;
    }
    const assignedClasses = [];

    if(this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I am a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;

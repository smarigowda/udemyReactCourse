import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    }

    let persons = null;
    if( this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((d, index) => {
            return (
              <Person
                key={d.id}
                click={ () => this.deletePersonHandler(index) }
                name={d.name}
                age={d.age} 
                changed={ event => { this.nameChangeHandler(event, d.id) } } />
            )
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={ this.togglePersonsHandler }>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [ 
      { name: 'Santosh', age: 43 },
      { name: 'Roopa', age: 40 },
      { name: 'Sukruthi', age: 12 }
    ],
    otherState: 'Some other state',
    showPersons: false
  }

  switchNameHandler = newName => {
    // console.log('Was clicked!');
    // DON'T DO THIS this.state.persons[0].name = 'Santosh Marigowda';
    this.setState({
      persons: [
        { name: 'Santosh Marigowda', age: 43 },
        { name: 'Roopa', age: 40 },
        { name: 'Sukruthi', age: 13 }
      ]
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = personIndex => {
    const persons = this.state.persons;
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
                click = { () => this.deletePersonHandler(index) }
                name={d.name}
                age={d.age} />
            )
          })}
          {/* <Person 
            name={ this.state.persons[0].name }
            age={ this.state.persons[0].age }/>
          <Person 
            name={ this.state.persons[1].name }
            age={ this.state.persons[1].age }
            click={ this.switchNameHandler.bind(this, 'Santosh!') }
            changed={ this.nameChangedHandler }>Hobbies: Reading</Person>
          <Person 
            name={ this.state.persons[2].name }
            age={ this.state.persons[2].age }/> */}
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
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does it work now?'));
  }
}

export default App;

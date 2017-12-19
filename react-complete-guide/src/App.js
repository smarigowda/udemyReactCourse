import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [ 
      { name: 'Santosh', age: 43 },
      { name: 'Roopa', age: 40 },
      { name: 'Sukruthi', age: 12 }
    ]
  }

  switchNameHandler = newName => {
    // console.log('Was clicked!');
    // DON'T DO THIS this.state.persons[0].name = 'Santosh Marigowda';
    this.setState({
      persons: [
        { name: newName, age: 43 },
        { name: 'Roopa', age: 40 },
        { name: 'Sukruthi', age: 13 }
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, I am a React App</h1>
        <p>This is really working!</p>
        <button onClick={ () => this.switchNameHandler('Santosh Marigowda') }>Switch Name</button>
        <Person 
          name={ this.state.persons[0].name }
          age={ this.state.persons[0].age }/>
        <Person 
          name={ this.state.persons[1].name }
          age={ this.state.persons[1].age }
          click={ this.switchNameHandler.bind(this, 'Santosh!') }>Hobbies: Reading</Person>
        <Person 
          name={ this.state.persons[2].name }
          age={ this.state.persons[2].age }/>
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does it work now?'));
  }
}

export default App;

import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      persons: [ 
        { id: 'ajfjak', name: 'Santosh', age: 43 },
        { id: 'cnbnvc', name: 'Roopa', age: 40 },
        { id: 'wedjad', name: 'Sukruthi', age: 12 }
      ],
      otherState: 'Some other state',
      showPersons: false
    }
  
    console.log('[App.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  // -- replaced by PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   // return true;
  //   return nextState.persons !== this.state.persons ||
  //          nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [ 
  //     { id: 'ajfjak', name: 'Santosh', age: 43 },
  //     { id: 'cnbnvc', name: 'Roopa', age: 40 },
  //     { id: 'wedjad', name: 'Sukruthi', age: 12 }
  //   ],
  //   otherState: 'Some other state',
  //   showPersons: false
  // }

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
    console.log('[App.js] Inside render()');
    let persons = null;
    if( this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
      />
    }

    return (
      <Aux>
        <button onClick={() => { this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        />
        {persons}
      </Aux>
    );
  }
}

export default withClass(App, classes.App);

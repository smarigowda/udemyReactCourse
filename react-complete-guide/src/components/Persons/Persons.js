import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  constructor(props) {
    super(props);
    console.log('[Persons.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount');
  }
  render() {
    console.log('[Persons.js] Inside render()');
    return this.props.persons.map((d, index) => {
      return <Person
        key={d.id}
        click={() => this.props.clicked(index)}
        name={d.name}
        age={d.age}
        changed={event => { this.props.changed(event, d.id) }} />
    })
  }
}

export default Persons;

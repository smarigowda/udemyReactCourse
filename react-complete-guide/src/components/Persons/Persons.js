import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  render() {
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

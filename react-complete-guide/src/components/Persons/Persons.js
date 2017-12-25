import React from 'react';
import Person from './Person/Person';

const persons = props => props.persons.map((d, index) => {
    return (
      <Person
        key={d.id}
        click={() => props.clicked(index)}
        name={d.name}
        age={d.age}
        changed={event => { props.changed(event, d.id) }} />
    )
  })

export default persons;
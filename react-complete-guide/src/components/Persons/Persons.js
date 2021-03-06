import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
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

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  // -- replaced by PureComponent
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextProps.persons !== this.props.persons || 
  //          nextProps.changed !== this.props.changed ||
  //          nextProps.clicked !== this.props.clicked;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE Persons.js] Inside componentDidUpdate');
  }

  render() {
    console.log('[Persons.js] Inside render()');
    return this.props.persons.map((d, index) => {
      return <Person
        key={d.id}
        position={index}
        click={() => this.props.clicked(index)}
        name={d.name}
        age={d.age}
        changed={event => { this.props.changed(event, d.id) }} />
    })
  }
}

export default Persons;

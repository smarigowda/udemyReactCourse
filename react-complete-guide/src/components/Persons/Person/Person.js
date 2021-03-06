import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log('[Person.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount');
    console.log(this.inputElement);
    if(this.props.position === 0) {
      this.inputElement.focus();
    }

  }

  componentWillUnmount() {
    console.log('[Person.js] Inside componentWillUnmount');
  }
  render() {
    console.log('[Person.js] Inside render()');
    return (
      <Aux>
        <p onClick={this.props.click}>I am {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input
          type="text"
          ref={inp => {
            this.inputElement = inp;
          }}  
          onChange={this.props.changed}
          value={this.props.name}/>
      </Aux>
    )
    // return [
    //   <p key="1" onClick={ this.props.click }>I am { this.props.name } and I am { this.props.age } years old!</p>,
    //   <p key="2">{ this.props.children }</p>,
    //   <input key="3" type="text" onChange={ this.props.changed } value={ this.props.name }/>
    // ]
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
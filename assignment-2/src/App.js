import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';

class App extends Component {
  state = {
    charCount: 0
  }

  changeHandler = event => {
    const strArray = event.target.value.split('');
    this.setState({
      charCount: strArray.length
    })

  }

  render() {
    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>this is Assignment 2</h2>
        <input
          type="text"
          onChange={ this.changeHandler }>
        </input>
        <ValidationComponent charCount={this.state.charCount}></ValidationComponent>
      </div>
    );
  }
}

export default App;

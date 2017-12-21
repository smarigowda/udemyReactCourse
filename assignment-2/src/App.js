import React, { Component } from 'react';
import './App.css';

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
        <p className="char-count">Number of characters = <span>{this.state.charCount}</span></p>
      </div>
    );
  }
}

export default App;

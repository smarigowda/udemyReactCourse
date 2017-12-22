import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    charCount: 0,
    inputArray: []
  }

  changeHandler = event => {
    const strArray = event.target.value.split('');

    this.setState({
      charCount: strArray.length,
      inputArray: strArray
    })
  }

  render() {
    const charArrayJSX = this.state.inputArray.map((d, i) => {
      return <CharComponent char={d} index={i}></CharComponent>
    });

    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>this is Assignment 2</h2>
        <input
          type="text"
          onChange={ this.changeHandler }>
        </input>
        <ValidationComponent charCount={this.state.charCount}></ValidationComponent>
        {charArrayJSX}
      </div>
    );
  }
}

export default App;

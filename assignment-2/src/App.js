import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    userInput: '',
  }

  changeHandler = event => {
    this.setState({
      userInput: event.target.value
    })
  }

  charChangeHandler = (event, index) => {
    const inputArray = this.state.userInput.split('');
    inputArray.splice(index, 1);
    this.setState({
      userInput: inputArray.join('')
    })
  }
  render() {
    const inputArray = this.state.userInput.split('');
    const charArrayJSX = inputArray.map((d, i) => {
      return <CharComponent key={i} char={d} index={i} remove={event => {this.charChangeHandler(event, i)}}></CharComponent>
    });

    const charCount = this.state.userInput.split('').length;

    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>this is Assignment 2</h2>
        <input
          type="text"
          onChange={this.changeHandler}
          value={this.state.userInput}>
        </input>
        <ValidationComponent charCount={charCount}></ValidationComponent>
        {charArrayJSX}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    userInput: '',
  }

  changeHandler = event => {
    this.setState({
      userInput: event.target.value
    })
  }

  deleteCharHandler = index => {
    const inputArray = this.state.userInput.split('');
    inputArray.splice(index, 1);
    this.setState({
      userInput: inputArray.join('')
    })
  }
  render() {
    const CharList = this.state.userInput.split('').map((ch, index) => {
      return <Char key={index} char={ch} index={index} clicked={() => {this.deleteCharHandler(index)}}></Char>
    });

    const charCount = this.state.userInput.length;

    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>this is Assignment 2</h2>
        <input
          type="text"
          onChange={this.changeHandler}
          value={this.state.userInput}>
        </input>
        <p>You entered: {this.state.userInput}</p>
        <Validation charCount={charCount}></Validation>
        {CharList}
      </div>
    );
  }
}

export default App;

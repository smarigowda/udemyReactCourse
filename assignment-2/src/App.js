import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    charCount: 0,
    inputArray: [],
    inputString: '',
  }

  changeHandler = event => {
    this.state.inputString = event.target.value;
    const strArray = event.target.value.split('');

    this.setState({
      charCount: strArray.length,
      inputArray: strArray
    })
  }

  charChangeHandler = (event, index) => {
    console.log(event);
    console.log(event.target.innerText, index);
    const inputArray = [...this.state.inputArray];
    inputArray.splice(index, 1);
    console.log(inputArray.join(''));
    this.setState({
      inputArray: inputArray,
      inputString: inputArray.join('')
    })
  }
  render() {
    const charArrayJSX = this.state.inputArray.map((d, i) => {
      return <CharComponent key={i} char={d} index={i} remove={ event => { this.charChangeHandler(event, i)} }></CharComponent>
    });

    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>this is Assignment 2</h2>
        <input
          type="text"
          onChange={ this.changeHandler }
          value={this.state.inputString}>
        </input>
        <ValidationComponent charCount={this.state.charCount}></ValidationComponent>
        {charArrayJSX}
      </div>
    );
  }
}

export default App;

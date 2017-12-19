import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>Assignment 1</h2>
        <UserInput />
        <UserOutput name="Santosh"/>
        <UserOutput name="Roopa"/>
        <UserOutput name="Sukruthi"/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    name: 'Santosh!'
  }

  nameHandler = event => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Hi, React Course on Udemy</h1>
        <h2>Assignment 1</h2>
        <UserInput changed={this.nameHandler} name={this.state.name}/>
        <UserOutput name={this.state.name}/>
        <UserOutput name="Roopa"/>
        <UserOutput name="Sukruthi"/>
      </div>
    );
  }
}

export default App;

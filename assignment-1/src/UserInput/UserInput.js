import React from 'react';
import './UserInput.css';

const userInput = props => {
  return (
    <div className="user-input">
      <input type="text" onChange={props.changed} value={props.name}></input>
    </div>
  )
}

export default userInput;
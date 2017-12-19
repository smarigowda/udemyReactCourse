import React from 'react';
import './UserInput.css';

const userInput = props => {
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '2px solid green',
    padding: '8px',
    cursor: 'pointer',
  };

  return (
    <div className="user-input">
      <input type="text" onChange={props.changed} value={props.name} style={style}></input>
    </div>
  )
}

export default userInput;
import React from 'react';
import './UserOutput.css';

const userOutput = props => {
  return (
    <div className="user-output">
      <p>{props.name}</p>
      <p>Para 2</p>
    </div>
  )
}

export default userOutput;
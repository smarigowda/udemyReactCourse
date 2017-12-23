import React from 'react';

const char = props => {
  return (
    <div className="char-component" onClick={props.clicked}>
      <p>{props.char}</p>
    </div>
  )
}

export default char;
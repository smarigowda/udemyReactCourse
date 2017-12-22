import React from 'react';

const charComponent = props => {
  return (
    <div className="char-component">
      <p onClick={props.remove}>{props.char}</p>
    </div>
  )
}

export default charComponent;
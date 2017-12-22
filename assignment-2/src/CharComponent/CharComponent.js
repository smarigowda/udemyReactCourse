import React from 'react';

const charComponent = props => {
  return (
    <div className="char-component" onClick={props.remove}>
      <p>{props.char}</p>
    </div>
  )
}

export default charComponent;
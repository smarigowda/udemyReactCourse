import React from 'react';

const validationComponent = props => {
  return (
    <div className="user-output">
      <p>Char Count = {props.charCount}</p>
    </div>
  )
}

export default validationComponent;
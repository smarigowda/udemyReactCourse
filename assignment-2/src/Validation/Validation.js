import React from 'react';

const validation = props => {
  let validationMessage = null;

  if(props.charCount < 5) {
    validationMessage = 'Text is too short'
  } else {
    validationMessage = 'Text is long enough'
  }

  return (
    <div className="user-output">
      <p>Char Count = {props.charCount}</p>
      <p>{validationMessage}</p>
    </div>
  )
}

export default validation;
import React from 'react';

const validationComponent = props => {
  let message = null;

  if(props.charCount < 5) {
    message = <p>Text is too short</p>
  } else if (props.charCount > 25) {
    message = <p>Text is too long</p>
  }

  return (
    <div className="user-output">
      <p>Char Count = {props.charCount}</p>
      {message}
    </div>
  )
}

export default validationComponent;
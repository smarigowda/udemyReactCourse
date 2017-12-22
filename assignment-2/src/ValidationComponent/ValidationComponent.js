import React from 'react';

const validationComponent = props => {
  let output = null;

  if(props.charCount < 5) {
    output = <p>Text is too short</p>
  } else if (props.charCount > 25) {
    output = <p>Text is too long</p>
  }

  return (
    <div className="user-output">
      <p>Char Count = {props.charCount}</p>
      {output}
    </div>
  )
}

export default validationComponent;
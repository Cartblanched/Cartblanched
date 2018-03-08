import React from 'react';

var SuccessMessage = (props) => {
  return (
    <div className="ui compact positive message">
      <p>{props.message}</p>
    </div>
  );
}

export default SuccessMessage;
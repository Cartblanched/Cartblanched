import React from 'react';

var ErrorMessage = (props) => {
  return (
    <div className="ui compact negative message">
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
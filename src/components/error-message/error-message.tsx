import React from 'react';

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <img src="/img/death-star.png" alt="error icon"/>
      <span className="boom">BOOM!</span>
      <span>
        something has gone terribly wrong
      </span>
      <span>
        (but we already sent droids to fix it)
      </span>
    </div>
  );
};

export default ErrorMessage;

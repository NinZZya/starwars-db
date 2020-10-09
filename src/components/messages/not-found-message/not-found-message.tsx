import React from 'react';
import ErrorMessage from '../error-message';
import { Link } from 'react-router-dom';
import { AppPath } from '../../../const';


const NotFoundMessage = () => {
  return (
    <ErrorMessage title="Page not found" text="">
      <p>Click <Link to={AppPath.ROOT}>here</Link> to go the main page</p>
    </ErrorMessage>
  );
};


export default NotFoundMessage;

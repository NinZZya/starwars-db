import React from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage}  from '../../components';
import { AppPath } from '../../constants/constants';


const NotFoundScreen = () => {
  return (
    <div className="not-found jumbotron rounded">
      <ErrorMessage title="Page not found" text="">
        <p>Click <Link to={AppPath.ROOT}>here</Link> to go the main page</p>
      </ErrorMessage>
    </div>
  );
};


export default NotFoundScreen;

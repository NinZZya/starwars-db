import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundMessage from '../../components/not-found-message';
import { AppPath } from '../../const';


const NotFoundPage = () => {
  return (
    <div className="not-found jumbotron rounded">
      <NotFoundMessage />
    </div>
  );
};


export default NotFoundPage;

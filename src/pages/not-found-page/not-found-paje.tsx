import React from 'react';
import { Link } from 'react-router-dom';
import { AppPath } from '../../const';


const NotFoundPage = () => {
  return (
    <div className="not-found jumbotron rounded">
      <img src="/img/death-star.png" alt="error icon"></img>
      <h1 className="title">Page not found</h1>
      <p>Click <Link to={AppPath.ROOT}>here</Link> to go the main page</p>
    </div>
  );
};


export default NotFoundPage;

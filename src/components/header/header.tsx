import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppPath } from '../../const';


const Header = () => {
  const history = useHistory();

  return (
    <nav className="header d-flex">
      <Link to={AppPath.ROOT} >
        <img src="/img/star-wars.svg" alt="logo" width="100" height="45"></img>
      </Link>
      <ul className="d-flex">
        <li>
          <Link to={AppPath.PERSONS}>People</Link>
        </li>
        <li>
          <Link to={AppPath.PLANETS}>Planets</Link>
        </li>
        <li>
          <Link to={AppPath.STARSHIPS}>Starships</Link>
        </li>
      </ul>
    </nav>
  );
};


export default Header;

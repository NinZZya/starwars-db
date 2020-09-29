import React from 'react';

const AppHeader = () => {
  return (
    <nav className="header d-flex">
      <p className="header-logo">
        <a href="#" >
          Star Wars DB
        </a>
      </p>
      <ul className="d-flex">
        <li>
          <a href="#">People</a>
        </li>
        <li>
          <a href="#">Planets</a>
        </li>
        <li>
          <a href="#">Starships</a>
        </li>
      </ul>
    </nav>
  );
};

export default AppHeader;

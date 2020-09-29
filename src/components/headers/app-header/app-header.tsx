import React from 'react';

const AppHeader = () => {
  return (
    <nav className="header d-flex">
      <a href="#" >
        <img src="./img/star-wars.svg" alt="logo" width="100" height="45"></img>
      </a>
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

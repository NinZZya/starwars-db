import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppPath } from '../../const';


interface IMenuItem {
  name: string;
  path: AppPath;
}

interface P {
  menuItems: IMenuItem[]
}

const Header: FC<P> = (props) => {
  const { menuItems } = props;
  const history = useHistory();

  return (
    <nav className="header d-flex">
      <Link to={AppPath.ROOT} >
        <img src="/img/star-wars.svg" alt="logo" width="100" height="45"></img>
      </Link>
      <ul className="d-flex">
        {menuItems.map((menuItem, index) => (
          <li
            key={`menu-item-${index}`}
            onClick={() => history.push(menuItem.path)
            }>
            <Link to={menuItem.path}>
              {menuItem.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="d-flex login">
        <li>
          <Link to={AppPath.ROOT}>Log in</Link>
        </li>
      </ul>
    </nav>
  );
};


export default Header;

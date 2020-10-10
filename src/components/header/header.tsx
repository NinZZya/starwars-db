import React from 'react';
import Logo from '../logo';
import HorizontalMenu from '../menus/horizontal-menu';
import UserMenu from '../menus/user-menu';
import { AppPath, menuItems } from '../../const';


const Header = () => {

  return (
    <nav className="header d-flex">
      <Logo path={AppPath.ROOT} />
      <HorizontalMenu items={menuItems} />
      <UserMenu />
    </nav>
  );
};


export default Header;

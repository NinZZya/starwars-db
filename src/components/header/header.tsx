import React, { FC } from 'react';
import Logo from '../logo';
import HorizontalMenu from '../menus/horizontal-menu';
import UserMenu from '../menus/user-menu';
import * as Type from '../../types';
import { AppPath, menuItems, UserStatus } from '../../const';


interface P {
  user: Type.IUser;
  userStatus: UserStatus;
  onLogout: () => void;
}

const Header: FC<P> = (props) => {
  const { user, userStatus, onLogout } = props;

  return (
    <nav className="header d-flex">
      <Logo path={AppPath.ROOT} />
      <HorizontalMenu items={menuItems} />
      <UserMenu user={user} userStatus={userStatus} onLogout={onLogout} />
    </nav>
  );
};


export default Header;

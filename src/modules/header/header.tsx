import React, { FC } from 'react';
import { connect } from 'react-redux';
import { HorizontalMenu, Logo } from '../../components';
import UserMenu from './components/user-menu';
import { UserAction, UserSelector } from '../../store/redux/user';
import { User, State, DispatchAsync } from '../../constants/types';
import { AppPath, menuItems, UserStatus } from '../../constants/constants';
import './header';


export interface HeaderProp {
  user: User;
  userStatus: UserStatus;
  onLogout: () => void;
}

const Header: FC<HeaderProp> = (props) => {
  const { user, userStatus, onLogout } = props;

  return (
    <nav className="header d-flex">
      <Logo path={AppPath.ROOT} />
      <HorizontalMenu items={menuItems} />
      <UserMenu user={user} userStatus={userStatus} onLogout={onLogout} />
    </nav>
  );
};

const mapStateToProps = (state: State) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
});


const mapDispatchToPorops = (dispatch: DispatchAsync) => ({
  onLogout: () => {
    dispatch(UserAction.resetUser());
  },
});


export { Header };
export default connect(mapStateToProps, mapDispatchToPorops)(Header);

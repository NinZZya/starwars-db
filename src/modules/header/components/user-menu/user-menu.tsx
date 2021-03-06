import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { withActiveFlag } from '../../../../hocs';
import { User } from '../../../../constants/types';
import { AppPath, UserStatus } from '../../../../constants/constants';


interface UserMenuProp {
  isActive?: boolean;
  onActiveChange?: () => void;
  userStatus: UserStatus;
  user: User;
  onLogout: () => void;
}

const UserMenu: FC<UserMenuProp> = (props) => {
  const {
    isActive, onActiveChange,
    user, userStatus, onLogout
  } = props;

  const isAuth = userStatus === UserStatus.AUTH && user !== null;

  return (
    <div className="user-menu">
      {isAuth ? (
        <div>
          <div className="dropdown">

            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={onActiveChange}
            >
              <img src="/img/no-avatar.svg" width="42" height="42" />
                {user ? user.login : ''}
            </button>
            <div
              className={`dropdown-menu ${isActive ? 'show' : ''}`}
              aria-labelledby="dropdownMenuButton"
            >
              <Link to={AppPath.ROOT} className="dropdown-item" onClick={onLogout}>
                Log out ...
              </Link>
            </div>
          </div>
        </div>
      ) : (
          <div className="login">
            <Link to={AppPath.LOG_IN}>Log in</Link>
          </div>
        )}
    </div>
  );
};

export default withActiveFlag<UserMenuProp>(UserMenu);

import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import withActiveFlag from '../../../hocs/with-active-flag';
import * as UserSelector from '../../../redux/user/user-selectors';
import { resetUser } from '../../../redux/user/user-actions';
import * as Type from '../../../types';
import { AppPath, UserStatus } from '../../../const';


interface P {
  isActive?: boolean;
  onActiveChange?: () => void;
  userStatus?: UserStatus;
  user?: Type.IUser;
  logout?: () => void;
}

const UserMenu: FC<P> = (props) => {
  const {
    isActive, onActiveChange,
    user, userStatus, logout: onLogout
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

const mapStateToProps = (state: Type.IState) => ({
  userStatus: UserSelector.getUserStatus(state),
  user: UserSelector.getUser(state),
});


const mapDispatchToPorops = (dispatch: Type.TDispatch) => ({
  logout: () => {
    dispatch(resetUser());
  },
});


export { UserMenu };
export default withActiveFlag<P>(
  connect(mapStateToProps, mapDispatchToPorops)(UserMenu)
);

import React, { PureComponent } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { AppPath } from '../../const';


interface IMenuItem {
  name: string;
  path: AppPath;
}

interface IHeader {
  isAuth: boolean;
  menuItems: IMenuItem[];
  onLogout: () => void;
}

type P = RouteComponentProps & IHeader;

interface S {
  isUserMenuShow: boolean;
}

class Header extends PureComponent<P, S> {
  constructor(props: P) {
    super(props);

    this.state = {
      isUserMenuShow: false,
    };
  }

  render() {
    const { isAuth, menuItems, history, onLogout } = this.props;
    const { isUserMenuShow } = this.state;

    return (
      <nav className="header d-flex">
        <Link to={AppPath.ROOT} >
          <img src="/img/star-wars.svg" alt="logo" width="100" height="45"></img>
        </Link>
        <ul className="d-flex">
          {menuItems.map((menuItem, index) => (
            <li
              key={`menu-item-${index}`}
              onClick={() => history.push(menuItem.path)}
              >
              <Link to={menuItem.path}>
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
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
                  onClick={() => this.setState({isUserMenuShow: !isUserMenuShow})}
                >
                  <img src="/img/no-avatar.svg" width="42" height="42" />
                  User
                </button>
                <div
                  className={`dropdown-menu ${isUserMenuShow ? 'show' : ''}`}
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
      </nav>
    );
  }
};


export default withRouter(Header);

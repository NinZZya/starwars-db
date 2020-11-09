import React, { Children, FC, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { UserSelector } from '../../store/redux/user';
import { State } from '../../constants/types';
import { AppPath, UserStatus } from '../../constants/constants';
import './private-route';


interface PrivateRouteProp {
  userStatus: UserStatus;
  exact?: boolean | undefined;
  path: string;
  children?: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProp> = (props) => {
  const { path, children, userStatus } = props;
  const exact = !!props.exact;

  const isAuth = userStatus === UserStatus.AUTH;

  if (isAuth && path === AppPath.LOG_IN) {
    return <Redirect to={AppPath.ROOT} />;
  }

  if (!isAuth && path !== AppPath.LOG_IN) {
    return <Redirect to={AppPath.LOG_IN} />;
  }

  return (
    <Route
      path={path}
      exact={exact}
    >
      {children ? Children.map(children, ((child) => child)) : null}
    </ Route>
  );
}

const mapStateToProps = (state: State) => ({
  userStatus: UserSelector.getUserStatus(state),
});


export { PrivateRoute }
export default connect(mapStateToProps)(PrivateRoute);

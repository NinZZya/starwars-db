import React, { Children, FC, ReactNode } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppPath } from '../../const';


interface P {
  isAuth: boolean;
  exact?: boolean | undefined;
  path: string;
  children?: ReactNode;
}

const PrivateRoue: FC<P> = (props) => {
  const { isAuth, path, children } = props;
  const exact = !!props.exact;

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


export default PrivateRoue;

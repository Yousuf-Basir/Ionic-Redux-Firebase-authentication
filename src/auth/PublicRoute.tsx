import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '../store';

interface Props extends RouteProps {
  component: any;
}

/**
 * Checks if authenticated is true. 
 * If true then it Redirects to /page/dashboard.
 * If not ayhenticated it returns the component passed as parameter.
 * @param component JSX component
 */

const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return(
    <Route {...rest} render={props => !authenticated ? <Component {...props} /> : <Redirect to="/page/dashboard" />} />
  );
}

export default PublicRoute;
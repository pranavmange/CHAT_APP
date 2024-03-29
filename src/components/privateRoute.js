import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { children } from 'react';

const privateRoute = ({ children, ...routeProps }) => {
  const profile = false;
  if (!profile) {
    return <Redirect to="/signin" />;
  }
  // eslint-disable-next-line react/jsx-no-undef
  return <Route {...routeProps}>{children}</Route>;
};

export default privateRoute;

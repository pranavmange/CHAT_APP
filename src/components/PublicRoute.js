import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

const PublicRoute = ({ children, ...routeProps }) => {
  const profile = false;
  if (profile) {
    return <Redirect to="/" />;
  }
  // eslint-disable-next-line react/jsx-no-undef
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;

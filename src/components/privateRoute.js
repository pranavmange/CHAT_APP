// import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';
// import { children } from 'react'

const privateRoute = ({ children, ...routeProps }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { profile, isLoading } = useProfile();
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader
          center
          vertical
          size="md"
          content="Loading"
          speed="slow"
        ></Loader>
      </Container>
    );
  }
  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }
  // eslint-disable-next-line react/jsx-no-undef
  return <Route {...routeProps}>{children}</Route>;
};

export default privateRoute;

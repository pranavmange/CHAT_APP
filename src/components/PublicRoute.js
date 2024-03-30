import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useProfile } from '../context/profile.context';
import { Container, Loader } from 'rsuite';

const PublicRoute = ({ children, ...routeProps }) => {
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
  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }
  // eslint-disable-next-line react/jsx-no-undef
  return <Route {...routeProps}>{children}</Route>;
};

export default PublicRoute;

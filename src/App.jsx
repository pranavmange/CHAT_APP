import { Switch } from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/privateRoute';
import Home from './pages/Home';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>

      {/* <Route path="/">Home</Route> */}
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;

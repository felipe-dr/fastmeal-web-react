import { BrowserRouter as Router } from 'react-router-dom';

import UserProvider from 'core/contexts/user/user.context';

import Routes from './routes';

export default function AppRoutingComponent(): JSX.Element {
  return (
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Router>
  );
}

import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import UserProvider from 'core/contexts/user/user.context';

import SignIn from 'features/auth/components/sign-in/sign-in.component';
import SignUp from 'features/auth/components/sign-up/sign-up.component';
import Home from 'features/home/pages/home.component';

import MainAuth from 'layouts/auth/main-auth/main-auth.component';
import MainWebsite from 'layouts/website/main-website/main-website.component';

function Routes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainWebsite />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
      ],
    },
    {
      path: '/auth',
      element: <MainAuth />,
      children: [
        {
          path: 'signin',
          element: <SignIn />,
        },
        {
          path: 'signup',
          element: <SignUp />,
        },
      ],
    },
  ]);

  return routes;
}

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Router>
  );
}

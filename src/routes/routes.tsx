import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import UserProvider from 'core/contexts/user/user.context';

import SignInComponent from 'features/auth/components/sign-in/sign-in.component';
import SignUpComponent from 'features/auth/components/sign-up/sign-up.component';
import HomeComponent from 'features/home/pages/home.component';
import RestaurantsComponent from 'features/restaurants/pages/restaurants.component';

import MainAuthComponent from 'layouts/auth/main-auth/main-auth.component';
import MainWebsiteComponent from 'layouts/website/main-website/main-website.component';

function Routes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainWebsiteComponent />,
      children: [
        {
          path: '/',
          element: <HomeComponent />,
        },
        {
          path: '/restaurants',
          element: <RestaurantsComponent />,
        },
      ],
    },
    {
      path: '/auth',
      element: <MainAuthComponent />,
      children: [
        {
          path: 'signin',
          element: <SignInComponent />,
        },
        {
          path: 'signup',
          element: <SignUpComponent />,
        },
      ],
    },
  ]);

  return routes;
}

export default function AppRouterComponent(): JSX.Element {
  return (
    <Router>
      <UserProvider>
        <Routes />
      </UserProvider>
    </Router>
  );
}

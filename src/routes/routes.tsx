import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import MainWebsiteComponent from 'layouts/website/main-website/main-website.component';

import withSuspense from './with-suspense.component';

const HomeComponent = withSuspense(
  lazy(() => import('features/home/pages/home.component'))
);
const RestaurantsComponent = withSuspense(
  lazy(() => import('features/restaurants/pages/restaurants.component'))
);
const MainAuthComponent = withSuspense(
  lazy(() => import('layouts/auth/main-auth/main-auth.component'))
);
const SignInComponent = withSuspense(
  lazy(() => import('features/auth/components/sign-in/sign-in.component'))
);
const SignUpComponent = withSuspense(
  lazy(() => import('features/auth/components/sign-up/sign-up.component'))
);

export default function Routes() {
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

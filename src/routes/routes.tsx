import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import MainWebsiteComponent from 'layouts/website/main-website/main-website.component';

import withSuspense from './with-suspense.component';

const HomeComponent = withSuspense(
  lazy(() => import('features/home/pages/home.component'))
);
const RestaurantsComponent = withSuspense(
  lazy(
    () => import('features/restaurants/pages/restaurants/restaurants.component')
  )
);
const RestaurantDetailsComponent = withSuspense(
  lazy(
    () =>
      import(
        'features/restaurants/pages/restaurant-details/restaurant-details.component'
      )
  )
);
const RestaurantMenuComponent = withSuspense(
  lazy(
    () =>
      import(
        'features/restaurants/components/restaurant-menu/restaurant-menu.component'
      )
  )
);
const RestaurantReviewsComponent = withSuspense(
  lazy(
    () =>
      import(
        'features/restaurants/components/restaurant-reviews/restaurant-reviews.component'
      )
  )
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
const NotFoundComponent = withSuspense(
  lazy(() => import('shared/components/not-found/not-found.component'))
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
          path: 'restaurants',
          element: <RestaurantsComponent />,
        },
        {
          path: 'restaurants/:id',
          element: <RestaurantDetailsComponent />,
          children: [
            {
              path: 'menu',
              element: <RestaurantMenuComponent />,
            },
            {
              path: 'reviews',
              element: <RestaurantReviewsComponent />,
            },
          ],
        },
      ],
    },
    {
      path: 'auth',
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
    {
      path: '*',
      element: <NotFoundComponent />,
    },
  ]);

  return routes;
}

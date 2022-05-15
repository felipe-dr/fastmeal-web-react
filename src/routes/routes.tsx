import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import Home from 'features/home/pages/home.component';

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
  ]);

  return routes;
}

export default function AppRouter(): JSX.Element {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import MainWebsite from 'layouts/website/main-website/main-website.component';

function Routes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainWebsite />,
      children: [{}],
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

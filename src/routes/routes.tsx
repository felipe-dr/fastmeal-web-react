import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

function Routes() {
  const routes = useRoutes([
    {
      path: '',
      element: '',
    },
  ]);

  return routes;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

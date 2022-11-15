import { BrowserRouter as Router } from 'react-router-dom';

import OrderProvider from 'core/contexts/order/order.context';
import UserProvider from 'core/contexts/user/user.context';

import Routes from './routes';

export default function AppRoutingComponent(): JSX.Element {
  return (
    <Router>
      <UserProvider>
        <OrderProvider>
          <Routes />
        </OrderProvider>
      </UserProvider>
    </Router>
  );
}

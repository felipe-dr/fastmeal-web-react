import { BrowserRouter as Router } from 'react-router-dom';

import BreakpointProvider from 'core/contexts/breakpoint/breakpoint.context';
import OrderProvider from 'core/contexts/order/order.context';
import ToastProvider from 'core/contexts/toast/toast.context';
import UserProvider from 'core/contexts/user/user.context';

import Routes from './routes';

export default function AppRoutingComponent(): JSX.Element {
  return (
    <Router>
      <BreakpointProvider>
        <UserProvider>
          <OrderProvider>
            <ToastProvider>
              <Routes />
            </ToastProvider>
          </OrderProvider>
        </UserProvider>
      </BreakpointProvider>
    </Router>
  );
}

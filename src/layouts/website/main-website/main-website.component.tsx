import { Outlet } from 'react-router-dom';

import BreakpointProvider from 'core/contexts/breakpoint/breakpoint.context';
import NavbarProvider from 'core/contexts/navbar/navbar.context';

import Footer from '../footer/footer.component';
import Header from '../header/header.component';

export default function MainWebsite(): JSX.Element {
  return (
    <>
      <BreakpointProvider>
        <NavbarProvider>
          <Header />
        </NavbarProvider>
      </BreakpointProvider>
      <main className="grid-container u-position-relative u-py-45">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

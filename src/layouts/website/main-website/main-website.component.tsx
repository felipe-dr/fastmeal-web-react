import { Outlet } from 'react-router-dom';

import BreakpointProvider from 'core/contexts/breakpoint/breakpoint.context';
import NavbarProvider from 'core/contexts/navbar/navbar.context';

import FooterComponent from '../footer/footer.component';
import HeaderComponent from '../header/header.component';

export default function MainWebsiteComponent(): JSX.Element {
  return (
    <>
      <BreakpointProvider>
        <NavbarProvider>
          <HeaderComponent />
        </NavbarProvider>
      </BreakpointProvider>
      <main className="u-position-relative u-pb-70">
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}

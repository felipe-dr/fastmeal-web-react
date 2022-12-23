import { Outlet } from 'react-router-dom';

import NavbarProvider from 'core/contexts/navbar/navbar.context';
import { useToastContext } from 'core/contexts/toast/toast.context';

import FooterComponent from '../footer/footer.component';
import HeaderComponent from '../header/header.component';

export default function MainWebsiteComponent(): JSX.Element {
  const { ToastComponent } = useToastContext({});

  return (
    <>
      <NavbarProvider>
        <HeaderComponent />
      </NavbarProvider>
      <main className="u-position-relative u-pb-70">
        <Outlet />
        {ToastComponent}
      </main>
      <FooterComponent />
    </>
  );
}

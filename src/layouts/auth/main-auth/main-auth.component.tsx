import BreakpointProvider from 'core/contexts/breakpoint/breakpoint.context';

import Auth from 'features/auth/pages/auth.component';

import Footer from 'layouts/website/footer/footer.component';

import styles from './main-auth.module.scss';

export default function MainAuth(): JSX.Element {
  return (
    <div className={styles['l-main-auth']}>
      <BreakpointProvider>
        <Auth />
      </BreakpointProvider>
      <Footer />
    </div>
  );
}

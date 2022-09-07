import BreakpointProvider from 'core/contexts/breakpoint/breakpoint.context';

import AuthComponent from 'features/auth/pages/auth.component';

import FooterComponent from 'layouts/website/footer/footer.component';

import styles from './main-auth.module.scss';

export default function MainAuthComponent(): JSX.Element {
  return (
    <div className={styles['l-main-auth']}>
      <BreakpointProvider>
        <AuthComponent />
      </BreakpointProvider>
      <FooterComponent />
    </div>
  );
}

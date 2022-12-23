import { useToastContext } from 'core/contexts/toast/toast.context';

import AuthComponent from 'features/auth/pages/auth.component';

import FooterComponent from 'layouts/website/footer/footer.component';

import styles from './main-auth.module.scss';

export default function MainAuthComponent(): JSX.Element {
  const { ToastComponent } = useToastContext({});

  return (
    <div className={styles['l-main-auth']}>
      <AuthComponent />
      {ToastComponent}
      <FooterComponent />
    </div>
  );
}

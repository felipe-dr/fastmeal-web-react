import styles from './spinner.module.scss';

export default function SpinnerComponent(): JSX.Element {
  return (
    <div className={styles['c-spinner']}>
      <span className={styles['c-spinner__load']} />
    </div>
  );
}

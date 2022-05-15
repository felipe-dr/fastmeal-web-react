import styles from './footer.module.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles['l-footer']}>
      <div className="grid-container u-text-center">
        <p className="s2">
          <span className="u-font-bold">Fastmeal</span> © 2022 - Alguns direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

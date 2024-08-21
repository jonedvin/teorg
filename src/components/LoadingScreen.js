import styles from '../styles/LoadingScreen.module.css';

export default function LoadingScreen() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}

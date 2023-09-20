import styles from './RotateAlert.module.css';

export const RotateAlert = () => {
  return (
    <div className={styles.alertCard}>
      <div className={styles.smartphone}>
        <div className={styles.screen} />
        <div className={styles.smartPhoneButton} />
        <div className={styles.speaker} />
      </div>
      <p>横画面にしてください</p>
    </div>
  );
};

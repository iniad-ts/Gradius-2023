import Link from 'next/link';
import { logoutWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './GameClear.module.css';

export const GameClear = () => {
  logoutWithLocalStorage();

  return (
    <div className={styles.controller}>
      <h1>Game Clear</h1>
      <Link href="/login" className={styles.button}>
        再プレイ
      </Link>
    </div>
  );
};

export default GameClear;

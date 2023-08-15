import Link from 'next/link';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Link href="/gradiusLogin">
          <div className={styles.button}>ログイン画面</div>
        </Link>
        <Link href="/ConfigScreen">
          <div className={styles.button}>設定画面</div>
        </Link>
        <Link href="/controller">
          <div className={styles.button}>コントローラー</div>
        </Link>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/gamescreen/0">
          <div className={styles.button}>ゲーム画面[0]</div>
        </Link>
        <Link href="/gamescreen/1">
          <div className={styles.button}>ゲーム画面[1]</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

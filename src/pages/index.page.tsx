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
    </div>
  );
};

export default Home;

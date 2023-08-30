import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const rotation = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const x = (windowWidth / 2 - e.clientX) / 50;
      const y = (windowHeight / 2 - e.clientY) / 50;
      setRotate({ x, y });
    };

    window.addEventListener('mousemove', rotation);
    return () => {
      window.removeEventListener('mousemove', rotation);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{ transform: `rotateX(${rotate.y}deg) rotateY(${rotate.x * -1}deg)` }}
      >
        <h1 className={styles.title}>Gradius</h1>
        <div className={styles.links}>
          <Link href="/game" className={styles.game}>
            ゲーム画面へ
          </Link>
          <Link href="/controller" className={styles.controller}>
            コントローラーへ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

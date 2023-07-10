import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const directions = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];

const Home = () => {
  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  // useEffect(() => {}, []);
  const hoge = true;

  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(e);
    console.log(e.code);
    const playerPos = await apiClient.handler.$post({
      body: { x: playerX, y: playerY, key: e.code },
    });
    setPlayerX(playerPos.x);
    setPlayerY(playerPos.y);
  };

  const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} />
    </div>
  );
};

export default Home;

//ここにコントローラーを書く
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  //bool
  const [up, setUp] = useState<boolean>(false);
  const [left, setLeft] = useState<boolean>(false);
  const [right, setRight] = useState<boolean>(false);
  const [down, setDown] = useState<boolean>(false);
  const [shoot, setShoot] = useState<boolean>(false);

  const keyDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}down`);
    if (id === 'up') {
      setUp(true);
    } else if (id === 'left') {
      setLeft(true);
    } else if (id === 'right') {
      setRight(true);
    } else if (id === 'down') {
      setDown(true);
    } else console.log('error');
  };

  const keyUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}up`);
    if (id === 'up') {
      setUp(false);
    } else if (id === 'left') {
      setLeft(false);
    } else if (id === 'right') {
      setRight(false);
    } else if (id === 'down') {
      setDown(false);
    } else console.log('error');
  };

  const shootDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}down`);
    if (id === 'shoot') {
      setShoot(true);
      shootTF(true);
    } else console.log('error');
  };

  const shootUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}up`);
    if (id === 'shoot') {
      setShoot(false);
      shootTF(false);
    } else console.log('error');
  };

  const shootTF = async (TF: boolean) => {
    const pos = await apiClient.handler.$get();
    apiClient.shoot.$post({
      body: { x: pos.x, y: pos.y, isShooting: TF },
    });
  };

  useEffect(() => {
    const move = () => {
      if (up) {
        apiClient.handler.$post({
          body: { key: 'ArrowUp' },
        });
      }
      if (left) {
        apiClient.handler.$post({
          body: { key: 'ArrowLeft' },
        });
      }
      if (right) {
        apiClient.handler.$post({
          body: { key: 'ArrowRight' },
        });
      }
      if (down) {
        apiClient.handler.$post({
          body: { key: 'ArrowDown' },
        });
      }

      console.log(up, left, right, down, shoot);
    };

    const interval = setInterval(() => {
      move();
    }, 100);
    return () => clearInterval(interval);
  }, [up, left, right, down, shoot]);
  return (
    <>
      <div onMouseDown={keyDown} onMouseUp={keyUp}>
        <div id="up" className={styles.arrowButton}>
          ↑
        </div>
        <div id="left" className={styles.arrowButton}>
          ←
        </div>
        <div id="right" className={styles.arrowButton}>
          →
        </div>
        <div id="down" className={styles.arrowButton}>
          ↓
        </div>
      </div>
      <div id="shoot" className={styles.arrowButton} onMouseDown={shootDown} onMouseUp={shootUp}>
        shoot
      </div>
    </>
  );
};

export default Home;

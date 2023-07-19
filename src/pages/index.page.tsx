import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';

const Home = () => {
  ////////////////////////////////////////////////
  ////////////////////////////////////////////////
  //デバッグ用
  // const [up, setUp] = useState<boolean>(false);
  // const [left, setLeft] = useState<boolean>(false);
  // const [right, setRight] = useState<boolean>(false);
  // const [down, setDown] = useState<boolean>(false);
  // const [shoot, setShoot] = useState<boolean>(false);

  // const keyDown = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const { id } = event.target as HTMLDivElement;
  //   console.log(`${id}down`);
  //   if (id === 'up') {
  //     setUp(true);
  //   } else if (id === 'left') {
  //     setLeft(true);
  //   } else if (id === 'right') {
  //     setRight(true);
  //   } else if (id === 'down') {
  //     setDown(true);
  //   } else console.log('error');
  // };

  // const keyUp = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const { id } = event.target as HTMLDivElement;
  //   console.log(`${id}up`);
  //   if (id === 'up') {
  //     setUp(false);
  //   } else if (id === 'left') {
  //     setLeft(false);
  //   } else if (id === 'right') {
  //     setRight(false);
  //   } else if (id === 'down') {
  //     setDown(false);
  //   } else console.log('error');
  // };

  // const shootDown = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const { id } = event.target as HTMLDivElement;
  //   console.log(`${id}down`);
  //   if (id === 'shoot') {
  //     setShoot(true);
  //     shootTF(true);
  //   } else console.log('error');
  // };

  // const shootUp = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const { id } = event.target as HTMLDivElement;
  //   console.log(`${id}up`);
  //   if (id === 'shoot') {
  //     setShoot(false);
  //     shootTF(false);
  //   } else console.log('error');
  // };

  // const shootTF = async (TF: boolean) => {
  //   const pos = await apiClient.handler.$get();
  //   apiClient.shoot.$post({
  //     body: { x: pos.x, y: pos.y, isShooting: TF },
  //   });
  // };

  // useEffect(() => {
  //   const move = () => {
  //     if (up) {
  //       apiClient.handler.$post({
  //         body: { key: 'ArrowUp' },
  //       });
  //     }
  //     if (left) {
  //       apiClient.handler.$post({
  //         body: { key: 'ArrowLeft' },
  //       });
  //     }
  //     if (right) {
  //       apiClient.handler.$post({
  //         body: { key: 'ArrowRight' },
  //       });
  //     }
  //     if (down) {
  //       apiClient.handler.$post({
  //         body: { key: 'ArrowDown' },
  //       });
  //     }
  //   };

  //   const interval = setInterval(() => {
  //     move();
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [up, left, right, down, shoot]);
  ///////////////////////////////////////////
  ///////////////////////////////////////////

  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(0);
  const hoge = true;

  const shootBullet = async () => {
    const res = await apiClient.handler.$get();
    const { x, y } = res;
    const size = 10; // 玉の大きさを指定する
    const color = 'blue'; // 玉の色を指定する

    const bullet = document.createElement('div');
    bullet.style.width = `${size}px`;
    bullet.style.height = `${size}px`;
    bullet.style.borderRadius = '50%';
    bullet.style.backgroundColor = color;
    bullet.style.position = 'absolute';
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;

    document.body.appendChild(bullet);
  };

  useEffect(() => {
    const fetchPos = async () => {
      const res = await apiClient.handler.$get();
      setPlayerX(res.x);
      setPlayerY(res.y);
    };

    const fetchShoot = async () => {
      const res = await apiClient.shoot.$get();
      if (res) {
        console.log('shoot');
        shootBullet();
      } else console.log('not shoot');
    };

    const interval = setInterval(() => {
      fetchPos();
    }, 100);

    const interval2 = setInterval(() => {
      fetchShoot();
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, [playerX, playerY]);

  if (!hoge) return <Loading visible />;

  return (
    <>
      <div className="container">
        <a href="/handler">handler</a>
        <div id="key">X:{playerX}</div>
        <div id="key">Y:{playerY}</div>
      </div>
      <div
        id="player"
        style={{
          position: 'absolute',
          left: `${playerX}px`,
          top: `${playerY}px`,
          backgroundColor: 'red',
          width: '25px',
          height: '25px',
        }}
      />
      {/* デバッグ用 */}
      {/* <div onMouseDown={keyDown} onMouseUp={keyUp}>
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
      </div> */}
      {/* デバッグ用 */}
    </>
  );
};

export default Home;

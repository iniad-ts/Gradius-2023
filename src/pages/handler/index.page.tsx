import { useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
// import styles from '../index.module.css';

const Home = () => {
  const hoge = true;

  const keydown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const game = await apiClient.handler.$post({
      body: { position: layerPosition, key: e.code },
    });
    setLayerPosition(game.position);
  };
  // const click = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   await apiClient.handler.$post();
  //   console.log(e);
  // };
  const [layerPosition, setLayerPosition] = useState({ x: 0, y: 0 });
  if (!hoge) return <Loading visible />;
  console.log(`x:${layerPosition.x}y:${layerPosition.y}`);

  return (
    <>
      <div className="debug-board" onKeyDown={keydown} tabIndex={0}>
        <div id="key">X:{layerPosition.x}</div>
        <div id="key">Y:{layerPosition.y}</div>
      </div>
      {/* <div className={styles['handler-board']} onKeyDown={keydown} tabIndex={0}>
        <button className={styles.handler}>-Y</button>
        <button className={styles.handler}>+Y</button>
        <button className={styles.handler}>-X</button>
        <button className={styles.handler}>+X</button>
      </div> */}
    </>
  );
};

export default Home;

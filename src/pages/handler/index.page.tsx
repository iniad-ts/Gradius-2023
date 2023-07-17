//ここにコントローラーを書く
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const keyDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}down`);
    if (id === 'up') {
      apiClient.handler.$post({
        body: { key: 'ArrowUp' },
      });
    } else if (id === 'left') {
      apiClient.handler.$post({
        body: { key: 'ArrowLeft' },
      });
    } else if (id === 'right') {
      apiClient.handler.$post({
        body: { key: 'ArrowRight' },
      });
    } else if (id === 'down') {
      apiClient.handler.$post({
        body: { key: 'ArrowDown' },
      });
    }
  };

  const keyUp = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    console.log(`${id}up`);
  };

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
    </>
  );
};

export default Home;

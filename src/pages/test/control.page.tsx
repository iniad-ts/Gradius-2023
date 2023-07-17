import styles from './index.module.css';

const App = () => {
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <>
      <div className={styles.board}>
        <div className={styles.container}>
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.up}`}
            // onClick={() => {
            //   const player: Player = {
            //     PlayerPos: { x: playerX, y: playerY },
            //     MoveInput: 'up',
            //   };
            //   fetchPlayer(player);
            //   console.log(playerY);
            // }}
          />
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.left}`}
            // onClick={() => {
            //   const player: Player = {
            //     PlayerPos: { x: playerX, y: playerY },
            //     MoveInput: 'left',
            //   };
            //   fetchPlayer(player);
            //   console.log(playerY);
            // }}
          />
          <div className={styles.button}>〇</div>
          <div
            className={`${styles.button} ${styles.right}`}
            // onClick={() => {
            //   const player: Player = {
            //     PlayerPos: { x: playerX, y: playerY },
            //     MoveInput: 'right',
            //   };
            //   fetchPlayer(player);
            //   console.log(playerY);
            // }}
          />
          <div className={styles.button} />
          <div
            className={`${styles.button} ${styles.down}`}
            // onClick={() => {
            //   const player: Player = {
            //     PlayerPos: { x: playerX, y: playerY },
            //     MoveInput: 'down',
            //   };
            //   fetchPlayer(player);
            //   console.log(playerY);
            // }}
          />
          <div className={styles.button} />
        </div>
        <div
          className={styles.shoot}
          // onClick={() => {
          //   fetchBullet();
          //   console.log(playerY);
          // }}
        >
          shoot
        </div>
      </div>
    </>
  );
};
export default App;

//reactを使う->import
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';
//////////////////上下左右前後に応じてpostするときのresBodyの値を0-5で変える
//////////////////上:4 下:1 左:0 右:3 前:2 後:5にしてほしい
const buttomMap = [
  [9, 4, 9],
  [0, 9, 3],
  [9, 1, 9],
];
//home関数
const Home = () => {
  // 各方向にpostする関数
  const postDirection = async (direction: number) => {
    await apiClient.gradius.game.post({ body: direction });
  };

  //////////////////多分前後はつかわないけど作っといて
  //////////////////発射はまた別のpostを用意するからいったんいいや
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {buttomMap.map((row, y) =>
          row.map((val, x) => (
            <div
              className={styles.buttom}
              style={{ backgroundColor: val === 9 ? '#0000' : '#f80' }}
              onClick={() => postDirection(val)}
              key={`${y}${x}`}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Home;

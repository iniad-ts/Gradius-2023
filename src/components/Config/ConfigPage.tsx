import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './Config.module.css';

export const Config = () => {
  const [playerSpeed, setPlayerSpeed] = useState<number>();
  const [playerSize, setPlayerSize] = useState<{ h: number; w: number }>();
  const [makeEnemyFrequency, setmakeEnemyFrequency] = useState<number>();
  const [enemySpeed, setenemyspeed] = useState<number>();
  const [enemySize, setEnemySize] = useState<{ h: number; w: number }>();

  const fetchInfo = async () => {
    const res = await apiClient.config.$get();
    setPlayerSpeed(res.playerSpeed);
    setPlayerSize(res.playerSize);
    setmakeEnemyFrequency(res.makeEnemyFrequency);
    setenemyspeed(res.enemySpeed);
    setEnemySize(res.enemySize);
    console.log(res.playerSpeed);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>項目</th>
              <th>現在の設定</th>
              <th>入力欄</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>基本playerspeed</th>
              <td>{playerSpeed}/0.1秒</td>
              <td>
                <input type="text" name="PlayerSpeed" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <th>基本playerサイズ</th>
              <td>
                h:{playerSize?.h} w:{playerSize?.w}
              </td>
              <td>
                <input type="text" name="PlayerSize_h" placeholder="高さを入力してください" />
                <input type="text" name="PlayerSize_w" placeholder="幅を入力してください" />
              </td>
            </tr>
            <tr>
              <th>敵の出現頻度</th>
              <td>1/{makeEnemyFrequency}秒</td>
              <td>
                <input type="text" name="Enemy" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <th>基本敵speed</th>
              <td>{enemySpeed}/0.1秒</td>
              <td>
                <input type="text" name="EnemySpeed" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <th>基本敵サイズ</th>
              <td>
                h:{enemySize?.h},w:{enemySize?.w}
              </td>
              <td>
                <input type="text" name="EnemySize_h" placeholder="高さを入力してください" />
                <input type="text" name="EnemySize_w" placeholder="幅を入力してください" />
              </td>
            </tr>
            <tr>
              <th>画面数</th>
              <td>15</td>
              <td>
                <input type="text" name="Screen" placeholder="入力してください" />
              </td>
            </tr>
          </tbody>

          <tfoot />
        </table>
        <button>更新</button>
      </div>
    </div>
  );
};

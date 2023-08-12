import styles from './Config.module.css';

export const Config = () => {
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
              <td>基本playerspeed</td>
              <td>5</td>
              <td>
                <input type="text" name="PlayerSpeed" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <td>基本playerサイズ</td>
              <td>h:30 w:20</td>
              <td>
                <input type="text" name="PlayerSize_h" placeholder="高さを入力してください" />
                <input type="text" name="PlayerSize_w" placeholder="幅を入力してください" />
              </td>
            </tr>
            <tr>
              <td>敵の出現頻度</td>
              <td>2/秒</td>
              <td>
                <input type="text" name="Enemy" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <td>基本敵speed</td>
              <td>10</td>
              <td>
                <input type="text" name="EnemySpeed" placeholder="入力してください" />
              </td>
            </tr>
            <tr>
              <td>基本敵サイズ</td>
              <td>h:30,w:20</td>
              <td>
                <input type="text" name="EnemySize_h" placeholder="高さを入力してください" />
                <input type="text" name="EnemySize_w" placeholder="幅を入力してください" />
              </td>
            </tr>
            <tr>
              <td>画面数</td>
              <td>15</td>
              <td>
                <input type="text" name="screen" placeholder="入力してください" />
              </td>
            </tr>
          </tbody>

          <tfoot />
        </table>
      </div>
    </div>
  );
};

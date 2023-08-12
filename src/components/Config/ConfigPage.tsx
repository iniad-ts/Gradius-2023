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
              <td> </td>
            </tr>
            <tr>
              <td>基本playerサイズ</td>
              <td>h:30,w:20</td>
              <td />
            </tr>
            <tr>
              <td>敵の出現頻度</td>
              <td>2/秒</td>
              <td />
            </tr>
            <tr>
              <td>基本敵speed</td>
              <td>10</td>
              <td />
            </tr>
            <tr>
              <td>基本敵サイズ</td>
              <td>h:30,w:20</td>
              <td />
            </tr>
            <tr>
              <td>画面数</td>
              <td>15</td>
              <td />
            </tr>
          </tbody>

          <tfoot />
        </table>
      </div>
    </div>
  );
};

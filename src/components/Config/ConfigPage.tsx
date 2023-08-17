import styles from './Config.module.css';

export const Config = () => {
  const [info, setInfo] = useState<ConfigModel>();
  const fetchInfo = async () => {
    const res = await apiClient.config.$get();
    setInfo(res);
  };
  const update = async (id: string) => {
    const inputElement = document.getElementById(id);
    if (inputElement !== null) {
      const inputValue = inputElement.value;
    }

    await apiClient.config.$post({ body: newInfo });
    console.log('更新!');
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
              <td>5/0.1秒</td>
              <td>
                <input type="text" id="PlayerSpeed" placeholder="入力してください" />
                <button onClick={() => update('PlayerSpeed')}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本playerサイズ</th>
              <td>h:30 w:20</td>
              <td>
                h:{info?.playerSize.h} w:{info?.playerSize.w}
              </td>
              <td>
                <input type="text" name="PlayerSize_h" placeholder="高さを入力してください" />
                <input type="text" name="PlayerSize_w" placeholder="幅を入力してください" />
                <button onClick={() => update()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>敵の出現頻度</th>
              <td>2/秒</td>
              <td>
                <input id="mEF" type="text" name="Enemy" placeholder="入力してください" />
                <button onClick={() => update()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本敵speed</th>
              <td>10/0.1秒</td>
              <td>
                <input type="text" name="EnemySpeed" placeholder="入力してください" />
                <button onClick={() => update()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本敵サイズ</th>
              <td>h:30,w:20</td>
              <td>
                h:{info?.enemySize.h},w:{info?.enemySize.w}
              </td>
              <td>
                <input type="text" name="EnemySize_h" placeholder="高さを入力してください" />
                <input type="text" name="EnemySize_w" placeholder="幅を入力してください" />
                <button onClick={() => update()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>画面数</th>
              <td>15</td>
              <td>
                <input type="text" name="Screen" placeholder="入力してください" />
                <button onClick={() => update()}>更新</button>
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

import type { ConfigModel } from '$/commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './Config.module.css';

export const Config = () => {
  const [info, setInfo] = useState<ConfigModel>();

  const newInfo = info;

  const fetchInfo = async () => {
    const res = await apiClient.config.$get();
    setInfo(res);
  };

  const updatePlayerSpeed = async () => {
    const inputElement = document.getElementById('PlayerSpeed') as HTMLInputElement;
    const inputValue = inputElement.value;

    if (newInfo !== undefined) {
      newInfo.playerSpeed = Number(inputValue);
      await apiClient.config.$post({ body: newInfo });
      setInfo(newInfo);
      console.log('送信');
    }
  };

  const updatePlayerSize = async () => {
    const inputElement_h = document.getElementById('PlayerSize_h') as HTMLInputElement;
    const inputValue_h = inputElement_h.value;
    const inputElement_w = document.getElementById('PlayerSize_w') as HTMLInputElement;
    const inputValue_w = inputElement_w.value;

    if (newInfo !== undefined) {
      newInfo.playerSize.h = Number(inputValue_h);
      newInfo.playerSize.w = Number(inputValue_w);
      await apiClient.config.$post({ body: newInfo });
      setInfo(newInfo);
    }
  };

  const updateMakeEnemyFrequency = async () => {
    const inputElement = document.getElementById('mEF') as HTMLInputElement;
    const inputValue = inputElement.value;

    if (newInfo !== undefined) {
      newInfo.makeEnemyFrequency = Number(inputValue);
      await apiClient.config.$post({ body: newInfo });
      setInfo(newInfo);
    }
  };

  const updateEnemySpeed = async () => {
    const inputElement = document.getElementById('EnemySpeed') as HTMLInputElement;
    const inputValue = inputElement.value;

    if (newInfo !== undefined) {
      newInfo.enemySpeed = Number(inputValue);
      await apiClient.config.$post({ body: newInfo });
      setInfo(newInfo);
    }
  };

  const updateEnemySize = async () => {
    const inputElement_h = document.getElementById('EnemySize_h') as HTMLInputElement;
    const inputValue_h = inputElement_h.value;
    const inputElement_w = document.getElementById('EnemySize_h') as HTMLInputElement;
    const inputValue_w = inputElement_w.value;

    if (newInfo !== undefined) {
      newInfo.enemySize.h = Number(inputValue_h);
      newInfo.enemySize.w = Number(inputValue_w);
      await apiClient.config.$post({ body: newInfo });
      setInfo(newInfo);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, [newInfo]);

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
              <td>{info?.playerSpeed}/0.1秒</td>
              <td>
                <input type="text" id="PlayerSpeed" placeholder="入力してください" />
                <button onClick={() => updatePlayerSpeed()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本playerサイズ</th>
              <td>
                h:{info?.playerSize.h} w:{info?.playerSize.w}
              </td>
              <td>
                <input
                  id="PlayerSize_h"
                  type="text"
                  name="PlayerSize_h"
                  placeholder="高さを入力してください"
                />
                <input
                  id="PlayerSize_w"
                  type="text"
                  name="PlayerSize_w"
                  placeholder="幅を入力してください"
                />
                <button onClick={() => updatePlayerSize()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>敵の出現頻度</th>
              <td>1/{info?.makeEnemyFrequency}秒</td>
              <td>
                <input id="mEF" type="text" name="Enemy" placeholder="入力してください" />
                <button onClick={() => updateMakeEnemyFrequency()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本敵speed</th>
              <td>{info?.enemySpeed}/0.1秒</td>
              <td>
                <input
                  id="EnemySpeed"
                  type="text"
                  name="EnemySpeed"
                  placeholder="入力してください"
                />
                <button onClick={() => updateEnemySpeed()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>基本敵サイズ</th>
              <td>
                h:{info?.enemySize.h},w:{info?.enemySize.w}
              </td>
              <td>
                <input
                  id="EnemySize_h"
                  type="text"
                  name="EnemySize_h"
                  placeholder="高さを入力してください"
                />
                <input
                  id="EnemySize_w"
                  type="text"
                  name="EnemySize_w"
                  placeholder="幅を入力してください"
                />
                <button onClick={() => updateEnemySize()}>更新</button>
              </td>
            </tr>
            <tr>
              <th>画面数</th>
              <td>15</td>
              <td>
                <input type="text" name="Screen" placeholder="入力してください" />
                {/* <button onClick={() => update()}>更新</button> */}
              </td>
            </tr>
          </tbody>

          <tfoot />
        </table>
      </div>
    </div>
  );
};

import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import {
  getUserIdFromLocalStorage,
  loginWithLocalStorage,
  logoutWithLocalStorage,
} from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [player, setPlayer] = useState<PlayerModel>();

  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const redirectToController = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId !== null) {
      return router.push('/controller');
    }
  }, [router]);

  const login = useCallback(async () => {
    const userId = getUserIdFromLocalStorage();
    if (userId === null) {
      const resPlayer = await apiClient.player.$post({ body: { name } });
      setPlayer(resPlayer);
      loginWithLocalStorage(resPlayer.id);
    } else {
      const resPlayer = await apiClient.player.control.$get({ query: { userId } });
      if (resPlayer === null) {
        logoutWithLocalStorage();
        return;
      }
      setPlayer(resPlayer);
    }
    setTimeout(() => router.push('/controller'), 5000);
  }, [name, router]);

  useEffect(() => {
    redirectToController();
  }, [redirectToController]);

  return (
    <div className={styles.container}>
      {player === undefined ? (
        <div className={styles.titlecard}>
          <h1 className={styles.title}>Gradius</h1>
          <span />
          <p className={styles.announcement}>ニックネームを入力してください</p>
          <input
            type="text"
            placeholder="ここに入力"
            className={styles.input}
            value={name}
            onChange={handleInput}
          />
          <button className={styles.button} disabled={name === ''} onClick={login}>
            プレイ
          </button>
          <p className={styles.announcement}>※ニックネームはゲームに使用されます</p>
        </div>
      ) : (
        <>{/*あなたはどっちですよコンポーネント*/}</>
      )}
    </div>
  );
};

export default Login;

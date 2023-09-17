import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
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
    if (getUserIdFromLocalStorage() === null) {
      const player: PlayerModel = await apiClient.player.$post({ body: { name } });
      loginWithLocalStorage(player.id);
    }
    router.push('/controller');
  }, [name, router]);

  useEffect(() => {
    redirectToController();
  }, [redirectToController]);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Login;

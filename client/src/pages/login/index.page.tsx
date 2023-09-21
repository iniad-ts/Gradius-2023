import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Confirm } from 'src/components/Confirm/Confirm';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const login = useCallback(async () => {
    if (getUserIdFromLocalStorage() === null) {
      const player: PlayerModel = await apiClient.player.$post({ body: { name } });
      loginWithLocalStorage(player.id);
    }
    router.push('/controller');
  }, [name, router]);

  useEffect(() => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId !== null) router.push('/controller');
  }, [router]);

  if (!isConfirmed) return <Confirm confirm={setIsConfirmed} />;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Gradius</h1>
        <p className={styles.text}>
          あなたの
          <ruby>
            宇宙船<rp>(</rp>
            <rt>うちゅうせん</rt>
            <rp>)</rp>
          </ruby>
          に
          <ruby>
            名前<rp>(</rp>
            <rt>なまえ</rt>
            <rp>)</rp>
          </ruby>
          をつけてください
        </p>
        <input
          type="text"
          placeholder="なまえをいれてね"
          className={styles.input}
          value={name}
          onChange={handleInput}
          autoComplete="off"
        />
        <button className={styles.button} disabled={name === ''} onClick={login}>
          プレイ
        </button>
        <div className={styles.spaceship}>
          <img src={staticPath.images.entity.blue_spaceship_png} />
        </div>
      </div>
    </div>
  );
};

export default Login;

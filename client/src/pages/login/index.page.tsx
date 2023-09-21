import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { DisplayYourSide } from 'src/components/DisplayYourSide/DisplayYourSide';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import { userIdParser } from '../../../../server/service/idParsers';
import styles from './index.module.css';

const player: PlayerModel = {
  id: userIdParser.parse('aaa'),
  name: 'yossuli',
  pos: { x: 0, y: 540 },
  score: 0,
  Items: [],
  side: 'left',
  isPlaying: true,
  speed: 1,
  startedAt: 0,
  usingItem: 'a',
};

const DISPLAY_DURATION = 5000;

const Login = () => {
  const [name, setName] = useState<string>('');
  const [hoge, setHoge] = useState(true);
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
      {hoge ? (
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
          <button className={styles.button} disabled={name === ''} onClick={() => setHoge(false)}>
            プレイ
          </button>
          <p className={styles.announcement}>※ニックネームはゲームに使用されます</p>
        </div>
      ) : (
        <DisplayYourSide player={player} displayDuration={DISPLAY_DURATION} router={router} />
      )}
    </div>
  );
};

export default Login;

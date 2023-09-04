import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [playersPlaying, setPlayersPlaying] = useState<PlayerModel[]>([]);
  const [playersDead, setPlayersDead] = useState<PlayerModel[]>([]);

  const router = useRouter();

  const redirectToController = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId !== null) {
      // return router.push('/controller');
    }
  }, [router]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const login = async () => {
    const player: PlayerModel = await apiClient.player.$post({ body: { name } });
    loginWithLocalStorage(player.userId);
    router.push('/controller');
  };

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({ query: {} });
    setPlayersPlaying(res.filter((player) => player.isPlaying));
    setPlayersDead(res.filter((player) => !player.isPlaying));
  };

  const playerCount = useMemo(() => {
    return playersPlaying.length;
  }, [playersPlaying]);

  const playerRanking = useMemo(() => {
    const sortedPlayers = playersDead.sort((a, b) => b.score - a.score);
    return sortedPlayers.slice(0, 10);
  }, [playersDead]);

  useEffect(() => {
    redirectToController();
  }, [redirectToController]);

  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchPlayers();
    });
    return () => cancelAnimationFrame(cancelId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h2>現在のプレイヤー</h2>
        <p>{playerCount}人</p>
        <div className={styles.players}>
          {playersPlaying.map((player) => (
            <div key={player.userId}>{player.name}</div>
          ))}
        </div>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>Gradius</h1>
        <input
          type="text"
          placeholder="名前を入力してください"
          className={styles.input}
          value={name}
          onChange={handleInput}
        />
        <button className={styles.button} disabled={name === ''} onClick={login}>
          プレイ
        </button>
      </div>
      <div className={styles.panel}>
        <h2>ランキング</h2>
        <div className={styles.ranking}>
          {playerRanking.map((player, i) => (
            <div key={player.userId}>
              <div>
                {i + 1}位 ({player.score}点)
              </div>
              <div>{player.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;

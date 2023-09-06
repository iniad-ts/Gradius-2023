import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [playersPlaying, setPlayersPlaying] = useState<PlayerModel[]>([]);
  const [playersDead, setPlayersDead] = useState<PlayerModel[]>([]);
  // const [team, setTeam] = useState(1);

  const router = useRouter();

  // const redirectToController = useCallback(async () => {
  //   const localStorageUserId = getUserIdFromLocalStorage();
  //   if (localStorageUserId !== null) {
  //     return router.push('/controller');
  //   }
  // }, [router]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // const changTeam = (type: string) => {
  //   if (type === 'red') setTeam(1);
  //   if (type === 'blue') setTeam(2);
  // };

  const login = async () => {
    const playersInfo: PlayerModel[] = await apiClient.player.info.$get();
    let team = 1;
    const left = playersInfo.filter((player) => player.side === 'left');
    const right = playersInfo.filter((player) => player.side === 'right');

    if (left > right) team = 2;
    const player: PlayerModel = await apiClient.player.$post({ body: { name, teamInfo: team } });
    loginWithLocalStorage(player.userId);
    router.push('/controller');
    team = 1;
  };

  const fetchPlayers = async () => {
    //一時的にdisplayNumber:0で固定
    const res = await apiClient.player.$get({ query: { displayNumber: 0 } });
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

  // useEffect(() => {
  //   redirectToController();
  // }, [redirectToController]);

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

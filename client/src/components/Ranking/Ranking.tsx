import type { PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useMemo, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './Ranking.module.css';

export const Ranking = () => {
  const [playersDead, setPlayersDead] = useState<PlayerModel[]>([]);

  const fetchPlayers = async () => {
    const res = await apiClient.player.$get({ query: { displayNumber: 0 } });
    setPlayersDead(res.filter((player) => !player.isPlaying));
  };

  useEffect(() => {
    const cancelId = requestAnimationFrame(() => {
      fetchPlayers();
    });
    return () => cancelAnimationFrame(cancelId);
  }, []);

  const playerRanking = useMemo(() => {
    const sortedPlayers = playersDead.sort((a, b) => b.score - a.score);
    return sortedPlayers.slice(0, 6);
  }, [playersDead]);

  return (
    <div className={styles.panel}>
      <h2>ランキング</h2>
      <div className={styles.ranking}>
        {playerRanking.map((player, i) => (
          <div key={player.id}>
            <div>
              {i + 1}位 ({player.score}点)
            </div>
            <div>{player.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;

import { ENEMY_HALF_WIDTH } from 'commonConstantsWithClient';
import type { BulletModel, EnemyModel, PlayerModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { computePosition } from 'src/utils/computePosition';

export const useGame = ({ displayPosition }: { displayPosition: number | null }) => {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModel[]>([]);
  const [bullets, setBullets] = useState<BulletModel[]>([]);
  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [effectPosition, setEffectPosition] = useState<number[][]>([]);

  const fetchPlayers = async () => {
    if (displayPosition === null) return;

    const res = await apiClient.player.$get({
      query: { displayNumber: displayPosition },
    });
    setPlayers(res);
  };

  const fetchEnemies = async () => {
    const res = await apiClient.enemy.$get();
    const killedEnemies = enemies.filter((enemy) => !res.some((e) => e.id === enemy.id));

    if (killedEnemies.length > 0) {
      const newEffectPosition = killedEnemies.map((enemy) => {
        const pos = computePosition(enemy.createdPos, enemy.createdAt, enemy.direction);
        return [pos.x - ENEMY_HALF_WIDTH, pos.y - ENEMY_HALF_WIDTH];
      });
      setEffectPosition((prev) => [...prev, ...newEffectPosition]);
    }
    setEnemies(res);
  };

  const fetchBullets = async () => {
    if (displayPosition === null) return;

    const res = await apiClient.bullet.$get({
      query: { displayNumber: displayPosition },
    });
    if (res.length > bullets.length) {
      const audio = new Audio(staticPath.sounds.shot_mp3);
      audio.play();
    }
    setBullets(res);
  };

  useEffect(() => {
    const cancelId = requestAnimationFrame(async () => {
      await Promise.all([fetchPlayers(), fetchEnemies(), fetchBullets()]);
    });
    return () => cancelAnimationFrame(cancelId);
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setEffectPosition((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [effectPosition]);

  return { bullets, players, enemies, effectPosition, displayPosition };
};

import { ENEMY_HALF_WIDTH } from 'commonConstantsWithClient';
import type { UserId } from 'commonTypesWithClient/branded';
import type {
  BulletModelWithPos,
  EnemyModelWithPos,
  PlayerModel,
} from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import type { Pos } from 'src/types/types';
import { apiClient } from 'src/utils/apiClient';

type prop = {
  displayPosition: number | null;
};

export const useDisplay = ({ displayPosition }: prop) => {
  //ANCHOR - state
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [enemies, setEnemies] = useState<EnemyModelWithPos[]>([]);
  const [bullets, setBullets] = useState<BulletModelWithPos[]>([]);

  //TODO: もし、これ以外のエフェクトを追加する場合は、それぞれのエフェクトを区別する型を作成する
  const [BombEffectPosition, setBombEffectPosition] = useState<Pos[][]>([[]]);
  const [damagedPlayerIds, setDamagedPlayerIds] = useState<Set<UserId>>(new Set());

  //ANCHOR - check
  const checkBombEffect = (resEnemies: EnemyModelWithPos[]) => {
    const currentEnemyIds = new Set(resEnemies.map((e) => e.id));
    const killedEnemies = enemies.filter(
      (enemy) =>
        !currentEnemyIds.has(enemy.id) &&
        (enemy.pos.x > 1920 * (displayPosition ?? 0) ||
          enemy.pos.x < 1920 * ((displayPosition ?? 0) + 1))
    );

    const newEffectPosition = killedEnemies.map((enemy) => {
      return { x: enemy.pos.x - ENEMY_HALF_WIDTH, y: enemy.pos.y - ENEMY_HALF_WIDTH };
    });

    setBombEffectPosition((prev) => [...prev.slice(-10), newEffectPosition]);
  };

  const checkDamageEffect = (resPlayers: PlayerModel[]) => {
    const damagedPlayers = resPlayers.filter((resPlayer) => {
      const prevPlayer = players.find((player) => player.id === resPlayer.id);
      return prevPlayer !== undefined && prevPlayer.score > resPlayer.score;
    });

    const newDamagedPlayerIds = new Set(damagedPlayers.map((player) => player.id));

    setDamagedPlayerIds(newDamagedPlayerIds);
  };

  //ANCHOR - fetch
  const fetchEntities = async () => {
    const res = await apiClient.entity.$get({
      query: { displayNumber: Number(displayPosition) },
    });
    checkBombEffect(res.enemies);
    checkDamageEffect(res.players);

    setPlayers(res.players);
    setEnemies(res.enemies);
    setBullets(res.bullets);
  };

  //ANCHOR - effect
  useEffect(() => {
    const cancelId = requestAnimationFrame(async () => {
      await fetchEntities();
    });
    return () => cancelAnimationFrame(cancelId);
  });

  return {
    bullets,
    players,
    enemies,
    BombEffectPosition,
    damagedPlayerIds,
  };
};

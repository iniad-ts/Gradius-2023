import type { UserId } from 'commonTypesWithClient/branded';
import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import GameClear from 'src/components/GameClear/GameClear';
import { Joystick } from 'src/components/Joystick/Joystick';
import { Loading } from 'src/components/Loading/Loading';
import { RotateAlert } from 'src/components/RotateAlert/RotateAlert';
import { ShootButton } from 'src/components/ShootButton/ShootButton';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, logoutWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './index.module.css';

const Home = () => {
  const router = useRouter();
  const [shouldRotate, setShouldRotate] = useState<boolean>(window.innerWidth < window.innerHeight);
  const [userId, setUserId] = useState<UserId>('' as UserId);
  const [player, setPlayer] = useState<PlayerModel>();

  const damageAudio = useMemo(() => new Audio(staticPath.sounds.damage_mp3), []);

  const getUserId = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (localStorageUserId === null) {
      router.push('/login');
      return;
    }
    setUserId(localStorageUserId);
  }, [router]);

  const fetchPlayer = useCallback(async () => {
    const res = await apiClient.player.control.$get({ query: { userId } });
    return res;
  }, [userId]);

  useEffect(() => {
    const set = () => setShouldRotate(window.innerWidth < window.innerHeight);
    window.addEventListener('resize', set);

    return () => {
      window.removeEventListener('reset', set);
    };
  }, []);

  useEffect(() => {
    const getUserIdIntervalId = setInterval(async () => {
      if (player?.isPlaying === false) return;
      await getUserId();
    }, 1000);

    return () => {
      clearInterval(getUserIdIntervalId);
    };
  }, [getUserId, player?.isPlaying]);

  useEffect(() => {
    const fetchPlayerIntervalId = setInterval(async () => {
      const res = await fetchPlayer();
      if (res === null) return;
      setPlayer(res);

      if (res.score < (player?.score ?? -Infinity)) damageAudio.play();
    }, 500);

    return () => {
      clearInterval(fetchPlayerIntervalId);
    };
  }, [fetchPlayer, damageAudio, player?.score]);

  if (player?.isPlaying === false) return <GameClear />;
  if (player === undefined) return <Loading visible={true} />;
  if (shouldRotate) return <RotateAlert />;

  return (
    <div className={styles.controller}>
      <Joystick userId={userId} />
      <div>
        スコア: {player?.score}
        <button onClick={logoutWithLocalStorage} onTouchEndCapture={logoutWithLocalStorage}>
          logout
        </button>
      </div>
      <ShootButton userId={userId} />
    </div>
  );
};

export default Home;

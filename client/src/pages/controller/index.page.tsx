import type { UserId } from 'commonTypesWithClient/branded';
import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import GameClear from 'src/components/GameClear/GameClear';
import { Joystick } from 'src/components/Joystick/Joystick';
import { staticPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { getUserIdFromLocalStorage, logoutWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import { usePlayerControl } from '../@hooks/usePlayerControl';
import { useWindowSize } from '../@hooks/useWindowSize';
import styles from './index.module.css';

const Home = () => {
  const router = useRouter();
  const windowSize = useWindowSize();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [userId, setUserId] = useState<UserId>('' as UserId);

  const { startMove, stopMove, startShoot, stopShoot, handelMove, shootBullet, isButtonActive } =
    usePlayerControl(userId);
  const [playerStatus, setPlayerStatus] = useState<PlayerModel>();

  const damageAudio = useMemo(() => new Audio(staticPath.sounds.damage_mp3), []);

  const getUserId = useCallback(async () => {
    const localStorageUserId = getUserIdFromLocalStorage();
    if (!(playerStatus?.isPlaying ?? true)) return;
    if (localStorageUserId === null) {
      alert('ログインがまだ行われておりません');
      return router.replace('/login');
    }
    setUserId(localStorageUserId);
  }, [router, playerStatus?.isPlaying]);

  const fetchPlayerStatus = useCallback(async () => {
    const res = await apiClient.player.control.$get({ query: { userId } });
    if (res === null) return;
    if (playerStatus && res.score < playerStatus.score) {
      damageAudio.play();
    }

    setPlayerStatus(res);
  }, [userId, playerStatus, setPlayerStatus, damageAudio]);

  const joystickSize = useMemo(() => {
    const aspectRatio = windowSize.width / windowSize.height;
    if (aspectRatio > 3 / 4) {
      return Math.min(windowSize.height, windowSize.width) * 0.5;
    } else {
      return windowSize.width * 0.5 * 0.64;
    }
  }, [windowSize]);

  useEffect(() => {
    setShowAlert(windowSize.width < windowSize.height);
    const userIdIntervalId = setInterval(() => {
      getUserId();
    }, 2000);
    const playerStatusIntervalId = setInterval(() => {
      fetchPlayerStatus();
    }, 500);
    return () => {
      clearInterval(userIdIntervalId);
      clearInterval(playerStatusIntervalId);
    };
  }, [getUserId, fetchPlayerStatus, windowSize]);

  if (!(playerStatus?.isPlaying ?? true)) return <GameClear />;

  return (
    <div className={styles.controller}>
      {showAlert ? (
        <div className={styles.alertcard}>
          <div className={styles.smartphone}>
            <div className={styles.screen} />
            <div className={styles.smartPhoneButton} />
            <div className={styles.speaker} />
          </div>
          <p>横画面にしてください</p>
        </div>
      ) : (
        <>
          <Joystick size={joystickSize} />
          <div>
            スコア: {playerStatus?.score} <br />
            <button onClick={logoutWithLocalStorage} onTouchEndCapture={logoutWithLocalStorage}>
              logout
            </button>
          </div>
          <button
            className={`${styles.button} ${isButtonActive ? styles.buttonActive : ''}`}
            onClick={shootBullet} //PCでクリックイベント
            onTouchEndCapture={shootBullet} //スマホでクリックイベント
            onTouchStart={startShoot}
            onTouchEnd={stopShoot}
            onTouchCancel={stopShoot}
            onMouseDown={startShoot}
            onMouseUp={stopShoot}
            onMouseLeave={stopShoot}
          >
            <div>🚀</div>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

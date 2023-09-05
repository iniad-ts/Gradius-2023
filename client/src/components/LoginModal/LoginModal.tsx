import type { PlayerModel } from 'commonTypesWithClient/models';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { loginWithLocalStorage } from 'src/utils/loginWithLocalStorage';
import styles from './LoginModal.module.css';
import Modal from './Modal';

const LoginModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const router = useRouter();
  const [team, setTeam] = useState(1);
  console.log(team);
  const changTeam = (type: string) => {
    if (type === 'red') setTeam(1);
    if (type === 'blue') setTeam(2);
  };

  const handleButtonClick = async () => {
    const player: PlayerModel = await apiClient.player.$post({
      body: { name: username, teamInfo: team },
    });
    loginWithLocalStorage(player.userId);
    setIsModalOpen(false);
    router.push('/controller');
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Play Now!
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <h2>Gradius</h2>
          <label>ユーザー名:</label>
          <input
            className={styles.font}
            type="text"
            placeholder="ユーザー名を入力してください"
            onChange={onChangeInput}
          />
          <div className={styles.team}>
            <div>team : </div>
            <button
              className={`${styles.buttons} ${styles.red}`}
              style={{ background: team === 1 ? '#ccc' : '#eee' }}
              onClick={() => changTeam('red')}
            >
              赤
            </button>
            <button
              className={`${styles.buttons} ${styles.blue}`}
              style={{ background: team === 2 ? '#ccc' : '#eee' }}
              onClick={() => changTeam('blue')}
            >
              青
            </button>
          </div>
          <button onClick={handleButtonClick}>はじめる</button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;

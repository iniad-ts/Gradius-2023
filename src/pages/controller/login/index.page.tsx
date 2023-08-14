import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { playerAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [player, setPlayer] = useAtom(playerAtom);
  const router = useRouter();

  if (player !== null) {
    router.push('/controller');
  }

  const login = async () => {
    if (isButtonDisabled) return;
    const res = await apiClient.login.$post({ body: { name } });
    setPlayer(res);
    if (res === null) return;
    await apiClient.session.player.$post({ body: { id: res.id } });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsButtonDisabled(e.target.value === '');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <h1>Gradius</h1>
          <h2>INIAD.tsへようこそ</h2>
        </div>
        <div className={styles.input}>
          <label>名前を入力してください</label>
          <input type="text" value={name} onChange={handleChange} />
        </div>
        <div className={styles.button}>
          <button onClick={login} disabled={isButtonDisabled} className={styles.button}>
            スタート
            <span />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

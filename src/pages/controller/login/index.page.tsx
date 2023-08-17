import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { playerAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';

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
    <div className={styles.all}>
      <h1 className={styles.text}>INIAD.tsにようこそ</h1>
      <h2 className={styles.text2}>ゲームで使用する名前を入力してください</h2>
      <div className={styles.box}>
        <input type="text" value={name} onChange={handleChange} className={styles.input} />
      </div>
      <div className={styles.box}>
        <button onClick={login} disabled={isButtonDisabled} className={styles.button}>
          決定
        </button>
      </div>
    </div>
  );
};

export default Login;

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
    <div>
      <h1>Login</h1>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={login} disabled={isButtonDisabled}>
        ログイン
      </button>
    </div>
  );
};

export default Login;

import { useState } from 'react';
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
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div>
      <h1>Login</h1>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

const Login = () => {
  const [name, setName] = useState<string>('');
  const handleLogin = async () => {
    const res = await apiClient.login.$post({ body: { userName: name } });
    if (res.name !== undefined && res.name !== '') {
      alert('ログイン成功');
      return;
    }
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

import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from '../gradiusLogin/index.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();
  const login = async () => {
    const user = await apiClient.rooms.createPlayer.$post({
      body: {
        username,
      },
    });
    localStorage.setItem('userId', user.userId);
    router.push('/controller');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Gradius</div>
        <div style={{ marginTop: '16px' }}>
          <form>
            <div className={styles.btn}>
              <input placeholder="Write your user name here." onChange={onChange} />
            </div>
            <button className={styles.handIn} onClick={login}>
              Play Gradius
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { apiClient } from 'src/utils/apiClient';
import styles from '../gradiusLogin/index.module.css';

const Login = () => {
  const login = async () => {
    const user = await apiClient.rooms.createPlayer.$get();
    localStorage.setItem('userId', user.userId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Gradius</div>
        <div style={{ marginTop: '16px' }}>
          <form>
            <div className={styles.btn}>
              <input placeholder="Write your user name here." />
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

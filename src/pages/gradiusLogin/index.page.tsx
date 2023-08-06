import styles from '../gradiusLogin/index.module.css';

const Login = () => {
  // const { addLoading, removeLoading } = useLoading();
  // const login = async () => {
  //   addLoading();
  //   await loginWithGitHub();
  //   removeLoading();
  // };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>Gradius</div>
        <div style={{ marginTop: '16px' }}>
          <div className={styles.btn}>
            <input placeholder="Write your user name here." />
          </div>
          <button className={styles.handIn}>Play Gradius</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

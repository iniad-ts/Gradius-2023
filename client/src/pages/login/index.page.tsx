import LoginModal from 'src/components/LoginModal/LoginModal';
import { staticPath } from 'src/utils/$path';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';

const Login = () => {
  const { addLoading, removeLoading } = useLoading();

  return (
    <div
      className={styles.container}
      style={{ background: `center/cover url('${staticPath.images.gradius_genesis_png}')` }}
    >
      <LoginModal />
    </div>
  );
};

export default Login;

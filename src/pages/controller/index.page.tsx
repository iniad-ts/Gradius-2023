import { useAtom } from 'jotai';
import { userAtom } from 'src/atoms/user';
import { Loading } from 'src/components/Loading/Loading';

const Controller = () => {
  const [user] = useAtom(userAtom);
  if (!user) return <Loading visible />;

  return (
    <div>
      <button />
    </div>
  );
};

export default Controller;

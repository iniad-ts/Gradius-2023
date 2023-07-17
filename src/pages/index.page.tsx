import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import { App } from './test/test';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <App />
    </>
  );
};

export default Home;

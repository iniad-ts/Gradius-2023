import type { TaskModel } from '$/commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [key, setKey] = useState('');
  // useEffect(() => {}, []);
  const hoge = true;
  const textarea = document.getElementById('input');

  const keydown = async (e: KeyboardEvent) => {
    const returnedKey = await apiClient.handler.$post({ body: { key: e.key } });
    setKey(returnedKey);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

  textarea?.addEventListener('keydown', keydown);

    await apiClient.tasks.post({ body: { label } });
    setLabel('');
    await fetchTasks();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).patch({ body: { done: !task.done } });
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete();
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks || !user) return <Loading visible />;

  return (
    <>
      <textarea placeholder="ここ" id="input" />
      <div id="key">Return{key}</div>
    </>
  );
};

export default Home;

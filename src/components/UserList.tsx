import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUsersStart } from '../store/slices/userSlice';

const UserList: React.FC = () => {
  // Получаем функцию dispatch для отправки экшенов в хранилище
  const dispatch = useDispatch();
  // Получаем данные из хранилища Redux: пользователи, флаг загрузки и сообщение об ошибке
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  // Получаем поисковый запрос из хранилища Redux
  const searchQuery = useSelector((state: RootState) => state.search.query);

  // Используем useEffect для загрузки пользователей при монтировании компонента
  useEffect(() => {
    // Отправляем экшен fetchUsersStart для начала загрузки списка пользователей
    dispatch(fetchUsersStart());
  }, [dispatch]); // Зависимость от dispatch, чтобы эффект срабатывал только при изменении dispatch

  // Фильтруем пользователей по поисковому запросу
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Отображаем сообщение о загрузке, если данные загружаются
  if (loading) {
    return <div className='users'>Loading users...</div>;
  }

  // Отображаем сообщение об ошибке, если произошла ошибка при загрузке
  if (error) {
    return <div className='users'>Error: {error}</div>;
  }

  // Отображаем список отфильтрованных пользователей
  return (
    <div className='users'>
      <h2>Users</h2>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className='item'>{user.id}. {user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
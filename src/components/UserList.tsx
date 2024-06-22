import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUsersStart } from '../store/slices/userSlice';
import { List, ListItemButton, Paper } from '@mui/material';

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
    return <Paper elevation={4} className='users'>Loading users...</Paper>;
  }

  // Отображаем сообщение об ошибке, если произошла ошибка при загрузке
  if (error) {
    return <Paper elevation={4} className='users'>Error: {error}</Paper>;
  }

  // Отображаем список отфильтрованных пользователей
  return (
    <Paper elevation={4} className='users'>
      <h2>Users</h2>
      <List disablePadding>
        {filteredUsers.map((user) => (
          <ListItemButton key={user.id} sx={{fontSize: '16px'}} dense divider>{user.id}. {user.name}</ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default UserList;
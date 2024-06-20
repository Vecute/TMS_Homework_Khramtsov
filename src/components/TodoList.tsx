import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchTodosStart } from '../store/slices/todoSlice';

const TodoList: React.FC = () => {
  // Получаем функцию dispatch для отправки экшенов в хранилище
  const dispatch = useDispatch();
  // Получаем данные из хранилища Redux: задачи, флаг загрузки и сообщение об ошибке
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  // Получаем поисковый запрос из хранилища Redux
  const searchQuery = useSelector((state: RootState) => state.search.query);

  // Используем useEffect для загрузки задач при монтировании компонента
  useEffect(() => {
    // Отправляем экшен fetchTodosStart для начала загрузки списка задач
    dispatch(fetchTodosStart()); 
  }, [dispatch]); // Зависимость от dispatch, чтобы эффект срабатывал только при изменении dispatch

  // Отображаем сообщение о загрузке, если данные загружаются
  if (loading) {
    return <div className='todo'>Loading tasks...</div>;
  }

  // Отображаем сообщение об ошибке, если произошла ошибка при загрузке
  if (error) {
    return <div className='todo'>Error: {error}</div>;
  }

  // Фильтруем задачи по поисковому запросу
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Отображаем список отфильтрованных задач
  return (
    <div className='todo'>
      <h2>ToDo</h2>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className='item'>{todo.id}. {todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
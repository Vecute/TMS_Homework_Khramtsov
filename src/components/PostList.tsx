import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchPostsStart } from '../store/slices/postSlice';

const PostList: React.FC = () => {
  // Получаем функцию dispatch для отправки экшенов в хранилище
  const dispatch = useDispatch();
  // Получаем данные из хранилища Redux: посты, флаг загрузки и сообщение об ошибке
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);
  // Получаем поисковый запрос из хранилища Redux
  const searchQuery = useSelector((state: RootState) => state.search.query);

  // Используем useEffect для загрузки постов при монтировании компонента
  useEffect(() => {
    // Отправляем экшен fetchPostsStart для начала загрузки постов
    dispatch(fetchPostsStart());
  }, [dispatch]); // Зависимость от dispatch, чтобы эффект срабатывал только при изменении dispatch

  // Фильтруем посты по поисковому запросу
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Отображаем сообщение о загрузке, если данные загружаются
  if (loading) {
    return <div className='posts'>Loading posts...</div>;
  }

  // Отображаем сообщение об ошибке, если произошла ошибка при загрузке
  if (error) {
    return <div className='posts'>Error: {error}</div>;
  }

  // Отображаем список отфильтрованных постов
  return (
    <div className='posts'>
      <h2>Posts</h2>
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className='item'>{post.id}. {post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
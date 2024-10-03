import '../styles/PostSearch.scss';
import useSearch from "../customHooks/useSearch";
import { useState, useEffect } from 'react';
import { PostCard, PostProps } from './PostCard';

const PostSearch = () => {
  const [posts, setPosts] = useState<Array<PostProps>>([]); // Использование хука состояния для хранения списка постов
  const { searchQuery } = useSearch();  // Использование кастомного хука useSearch для получения текущего поискового запроса

  useEffect(() => { // Использование хука эффекта для выполнения побочного эффекта (загрузка постов)
    const fetchPosts = async () => { // Объявление асинхронной функции fetchPosts для загрузки постов
      try {
        const response = await fetch('https://jsonplaceholder.org/posts'); // Отправка запроса на сервер для получения постов
        const data: PostProps[] = await response.json(); // Преобразование ответа от сервера в JSON
        setPosts(data); // Обновление состояния posts данными, полученными от сервера
      } catch (error) {
        console.error('Error when receiving posts:', error); // Вывод ошибки в консоль, если произошла ошибка при получении постов
      }
    };

    fetchPosts(); // Вызов функции fetchPosts
  }, []); // Пустой массив зависимостей для того чтобы эффект выполнился только один раз при монтировании компонента

  // Фильтрация постов по searchQuery
  const filteredPosts = posts.filter((post) => { // Фильтрация постов по поисковому запросу
    const lowerCaseQuery = searchQuery.toLowerCase(); // Преобразование поискового запроса в нижний регистр
    return post.title.toLowerCase().includes(lowerCaseQuery); // Проверка, содержит ли заголовок поста поисковый запрос
  });

  return (
    <div className="search-list">
      {filteredPosts.length > 0 ? ( // Проверка, есть ли отфильтрованные посты
        filteredPosts.map((post) => ( // Если есть, то для каждого поста...
          <PostCard key={post.id} {...post} /> // ...создается компонент PostCard
        ))
      ) : (
        <div className='search-empty'>No posts found 😭</div> // Если нет, то выводится сообщение об отсутствии постов
      )}
    </div>
  );
};

export default PostSearch;
import '../styles/PostList.scss';
import { useState, useEffect } from 'react';
import { PostCard, PostProps } from './PostCard';
import { PostModal } from './PostModal';

const sizes = ["small", "medium", "large"] as const; // Определяем константный массив размеров постов
export type Size = (typeof sizes)[number]; // Определяем тип Size как одно из значений массива sizes

const PostList = () => {
  const [posts, setPosts] = useState<Array<PostProps & { size: Size }>>([]); // Используем хук состояния для управления списком постов

  useEffect(() => { // Используем хук эффекта для выполнения действий после рендеринга компонента
    const fetchPosts = async () => { // Определяем асинхронную функцию для получения постов
      try {
        const response = await fetch('https://jsonplaceholder.org/posts'); // Отправляем запрос на сервер для получения постов
        const data: PostProps[] = await response.json(); // Преобразуем ответ сервера в формат JSON

        const postsWithSize = data.map((post) => ({ // Добавляем каждому посту случайный размер
          ...post,
          size: sizes[Math.floor(Math.random() * sizes.length)],
        }));

        setPosts(postsWithSize); // Обновляем состояние списка постов
      } catch (error) {
        console.error('Error:', error); // Выводим ошибку в консоль, если что-то пошло не так
      }
    };

    fetchPosts(); // Вызываем функцию для получения постов
  }, []); // Передаем пустой массив зависимостей, чтобы хук эффекта сработал только один раз после первого рендеринга компонента

  return (
    <div className="post-list">
      {posts.map((post) => ( // Проходим по каждому посту в списке
        <PostCard key={post.id} {...post} /> // И отображаем карточку поста
      ))}
      <PostModal/>
    </div>
  );
};

export default PostList;
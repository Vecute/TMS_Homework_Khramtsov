import '../styles/PostList.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { PostModal } from './PostModal';
import { RootState } from '../redux/store';
import PostsLoader from './PostsLoader';

const PostList = () => {
  // Создаем состояние activeTab с помощью useState и устанавливаем начальное значение "all"
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  // Получаем все посты из хранилища Redux с помощью useSelector
  const posts = useSelector((state: RootState) => state.postsReducer.posts);

  // Получаем объект favorites из хранилища Redux
  const favorites = useSelector((state: RootState) => state.favoritesReducer);

  // Фильтруем посты в зависимости от значения activeTab
  const filteredPosts = activeTab === "favorites" ? posts.filter((post) => favorites[post.id]) : posts;

  useEffect(() => {
    // Прокручиваем страницу в начало (0, 0)
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <PostsLoader />
      <div className='post__tab-line'>
        <button
          onClick={() => setActiveTab("all")} // При клике устанавливаем activeTab в "all"
          className={`post__tab ${activeTab === "all" ? "selected" : ""}`} // Динамически добавляем класс "selected", если activeTab равен "all"
        >
          All
        </button>

        <button
          onClick={() => setActiveTab("favorites")} // При клике устанавливаем activeTab в "favorites"
          className={`post__tab ${activeTab === "favorites" ? "selected" : ""}`} // Динамически добавляем класс "selected", если activeTab равен "favorites"
        >
          Favorites
        </button>
      </div>
      <div className="post-list">
        {/* Проверяем, есть ли отфильтрованные посты */}
        {filteredPosts.length > 0 ? (
          // Если есть, то для каждого поста рендерим компонент PostCard
          filteredPosts.map((post) => (
            <PostCard
              key={post.id} // Устанавливаем ключ для каждого элемента списка
              {...post} // Передаем все свойства поста в компонент PostCard как пропсы
            />
          ))
        ) : (
          <div className="post__empty">There are no posts 😭</div>
        )}
        <PostModal />
      </div>
    </div>
  );
};

export default PostList;
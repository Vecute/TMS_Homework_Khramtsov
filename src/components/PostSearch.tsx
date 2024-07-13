import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { PostCard } from './PostCard';
import useSearch from '../customHooks/useSearch';
import Pagination from '../services/searchPagination';
import "../styles/PostSearch.scss";

const PostSearch = () => {
  // Получаем все посты из хранилища Redux
  const posts = useSelector((state: RootState) => state.postsReducer.allPosts); 
  // Инициализируем хук useNavigate для перенаправления
  const navigate = useNavigate(); 
  // Получаем поисковый запрос из кастомного хука useSearch
  const { searchQuery } = useSearch(); 
  // Создаем состояние для хранения номера текущей страницы
  const [currentPage, setCurrentPage] = useState(1);
  // Задаем количество постов на странице
  const postsPerPage = 20;

  // Фильтруем посты по поисковому запросу
  const filteredPosts = posts.filter((post) => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Функция для обработки изменения страницы
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); 
  };

  // Вычисляем индексы начала и конца текущей страницы
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  // Получаем посты для текущей страницы
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="search-list">
      {/* Если есть найденные посты, отображаем их */}
      {currentPosts.length > 0 ? (
        currentPosts.map((post) => <PostCard key={post.id} {...post} />) 
      ) : (
        // Иначе, отображаем сообщение о том, что посты не найдены
        <div className="search-empty">No posts found 😭</div> 
      )}

      {/* Если общее количество страниц больше 1, отображаем компонент пагинации */}
      {totalPages > 1 && (
        <Pagination 
          totalPages={totalPages} 
          currentPage={currentPage} 
          onPageChange={handlePageChange} 
        />
      )}

      {/* Кнопка для возврата к странице со всеми постами */}
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default PostSearch;
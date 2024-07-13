import React from "react";
import { useAppDispatch, RootState } from "../redux/store";
import { setCurrentPage, updateCurrentPagePosts } from "../redux/postsReducer";
import { useSelector } from "react-redux";

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch(); // Получаем функцию dispatch для отправки действий Redux
  // Получаем все посты, текущую страницу и количество постов на странице из хранилища Redux
  const { allPosts, currentPage, postsPerPage } = useSelector((state: RootState) => state.postsReducer);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Обработчик клика по номеру страницы
  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber)); // Обновляем текущую страницу в хранилище
    dispatch(updateCurrentPagePosts()); // Обновляем список постов на странице
  };

  // Массив для хранения номеров страниц, которые будут отображаться
  const pagesToDisplay = [];
  // Максимальное количество отображаемых страниц (не считая точек)
  const maxDisplayedPages = 5; 

  // Логика для определения какие номера страниц отображать
  if (totalPages <= maxDisplayedPages) {
    // Если всего страниц меньше или равно максимальному количеству, то отображаем все
    for (let i = 1; i <= totalPages; i++) {
      pagesToDisplay.push(i);
    }
  } else {
    // Иначе отображаем первые 2, ..., последние 2 и текущую
    const ellipsis = -1; // Используем -1 как маркер для отображения "..."

    pagesToDisplay.push(1, 2); 

    if (currentPage > 3) {
      pagesToDisplay.push(ellipsis); 
    }

    // Вычисляем диапазон страниц вокруг текущей
    const startPage = Math.max(3, currentPage - 1);
    const endPage = Math.min(totalPages - 2, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pagesToDisplay.push(i)
    }

    if (currentPage < totalPages - 2) {
      pagesToDisplay.push(ellipsis); 
    }

    pagesToDisplay.push(totalPages - 1, totalPages); 
  }

  return (
    <div className="pagination">
      {/* Кнопка "назад" */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1} 
        className="pagination__button"
      >
      </button>

      {/* Список номеров страниц */}
      <ul className="pagination__list">
        {pagesToDisplay.map((page, index) => (
          <li
            key={index}
            // Динамические классы для активной страницы и троеточия
            className={`pagination__item ${currentPage === page ? 'active' : ''} ${page === -1 ? 'pagination__ellipsis' : ''}`}
            // Обработчик клика только для номеров страниц, не для "..."
            onClick={page !== -1 ? () => handlePageChange(page) : undefined} 
          >
            {page === -1 ? '...' : page} {/* Отображаем "..." или номер страницы */}
          </li>
        ))}
      </ul>

      {/* Кнопка "вперед" */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages} 
        className="pagination__button"
      >
      </button>
    </div>
  );
};

export default Pagination;
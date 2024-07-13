import React from "react";

interface PaginationProps {
  totalPages: number; // Общее количество страниц
  currentPage: number; // Номер текущей страницы
  onPageChange: (page: number) => void; // Функция, вызываемая при изменении страницы
}

const searchPagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Функция для рендеринга номеров страниц
  const renderPageNumbers = () => {
    // Массив для хранения элементов списка номеров страниц
    const pageNumbers = [];

    // Если общее количество страниц меньше или равно 5, отображаем все номера страниц
    if (totalPages <= 5) {
      // Цикл по всем страницам
      for (let i = 1; i <= totalPages; i++) {
        // Добавляем элемент списка для каждой страницы
        pageNumbers.push(
          <li
            key={i} // Ключ для React
            className={currentPage === i ? "active" : ""} // Добавляем класс "active" для текущей страницы
            onClick={() => onPageChange(i)} // Вызываем функцию onPageChange при клике на номер страницы
          >
            {i}
          </li>
        );
      }
      // Иначе, если страниц больше 5, отображаем сокращенный вариант пагинации
    } else {
      // Добавляем первую страницу
      pageNumbers.push(
        <li
          key={1}
          className={currentPage === 1 ? "active" : ""}
          onClick={() => onPageChange(1)}
        >
          1
        </li>
      );

      // Если текущая страница больше 3, добавляем многоточие после первой страницы
      if (currentPage > 3) {
        pageNumbers.push(
          <li className="search-pagination__ellipsis" key="dots-start">
            ...
          </li>
        );
      }

      // Определяем начальную и конечную страницы для отображения
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      // Отображаем номера страниц в диапазоне от startPage до endPage
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={currentPage === i ? "active" : ""}
            onClick={() => onPageChange(i)}
          >
            {i}
          </li>
        );
      }

      // Если текущая страница меньше, чем общее количество страниц - 2, добавляем многоточие перед последней страницей
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li className="search-pagination__ellipsis" key="dots-end">
            ...
          </li>
        );
      }

      // Добавляем последнюю страницу
      pageNumbers.push(
        <li
          key={totalPages}
          className={currentPage === totalPages ? "active" : ""}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </li>
      );
    }

    // Возвращаем массив элементов списка номеров страниц
    return pageNumbers;
  };

  return <ul className="search-pagination">{renderPageNumbers()} </ul>;
};

export default searchPagination;
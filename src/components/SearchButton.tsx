import "../styles/SearchButton.scss";
import React, { useState, useRef, useEffect, createContext, ReactNode, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSearch from "../customHooks/useSearch";

interface SearchContextType { // Определение интерфейса для контекста поиска
  searchQuery: string; // Поисковый запрос
  setSearchQuery: (query: string) => void; // Функция для установки поискового запроса
}

export const SearchContext = createContext<SearchContextType | null>(null); // Создание контекста для поиска

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // Компонент-провайдер для контекста поиска
  const [searchQuery, setSearchQuery] = useState(""); // Использование хука состояния для хранения поискового запроса

  return (
    // Провайдер контекста с текущим состоянием и функцией для его изменения.
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

const SearchButton = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // Использование кастомного хука useSearch для доступа к поисковому запросу и функции для его изменения
  const [showSearchInput, setShowSearchInput] = useState(false); // Использование хука состояния для отображения или скрытия поля ввода
  const inputRef = useRef<HTMLInputElement>(null); // Использование хука useRef для доступа к DOM-элементу поля ввода
  const navigate = useNavigate(); // Использование хука useNavigate для перехода на другие страницы
  const location = useLocation(); // Получение текущего местоположения
  const isSearchPage = location.pathname === "/search"; // Проверка, является ли текущая страница страницей поиска

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Обработчик изменения поля ввода
    setSearchQuery(event.target.value); // Установка нового значения поискового запроса
  };

  const handleSearchSubmit = (event: React.FormEvent) => { // Обработчик отправки формы
    event.preventDefault(); // Предотвращение стандартного поведения формы
    if (searchQuery.trim() !== "") { // Если поисковый запрос не пустой...
      navigate("/search"); // ...вызывается функция для изменения страницы
    }
  };

  useEffect(() => { // Использование хука эффекта для фокусировки на поле ввода при его отображении
    if (showSearchInput && inputRef.current) { // Если поле ввода отображается и ссылка на него существует...
      inputRef.current.focus(); // ...устанавливается фокус на поле ввода
    }
  }, [showSearchInput]); // Эффект зависит от состояния showSearchInput

  useEffect(() => {
    if (!isSearchPage) { // Если текущая страница не является страницей поиска...
      setShowSearchInput(false); // ...скрываем поле ввода
      setSearchQuery(""); // ...очищаем поле ввода
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); // Эффект зависит от текущего местоположения

  return (
    <Fragment>
      {showSearchInput ? (
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </form>
      ) : <div className="search-hidden"></div>}
      <button
        className={`search-button`}
        onClick={() => setShowSearchInput(!showSearchInput)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" />
          <path d="M21.3005 21.9986C21.1205 21.9986 20.9405 21.9286 20.8105 21.7986L18.9505 19.9386C18.6805 19.6686 18.6805 19.2286 18.9505 18.9486C19.2205 18.6786 19.6605 18.6786 19.9405 18.9486L21.8005 20.8086C22.0705 21.0786 22.0705 21.5186 21.8005 21.7986C21.6605 21.9286 21.4805 21.9986 21.3005 21.9986Z" />
        </svg>
      </button>
    </Fragment>
  );
};

export default SearchButton;
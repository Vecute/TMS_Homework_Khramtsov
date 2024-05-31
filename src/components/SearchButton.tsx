import "../styles/SearchButton.scss";
import React, { useState, useRef, useEffect, createContext, useContext, ReactNode } from "react";

interface SearchContextType { // Определение интерфейса для контекста поиска
  searchQuery: string; // Поисковый запрос
  setSearchQuery: (query: string) => void; // Функция для установки поискового запроса
}

const SearchContext = createContext<SearchContextType | null>(null); // Создание контекста для поиска

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => { // Компонент-провайдер для контекста поиска
  const [searchQuery, setSearchQuery] = useState(""); // Использование хука состояния для хранения поискового запроса

  return (
     // Провайдер контекста с текущим состоянием и функцией для его изменения.
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => { // Кастомный хук для использования контекста поиска
  const context = useContext(SearchContext); // Использование хука useContext для доступа к контексту поиска
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider"); // Если контекст не доступен, выбрасывается ошибка
  }
  return context; // Возвращается контекст
};

interface SearchButtonProps { // Определение интерфейса для пропсов компонента SearchButton
  onChangePage: (page: string) => void; // Функция для изменения страницы
}

const SearchButton: React.FC<SearchButtonProps> = ({ onChangePage }) => {
  const { searchQuery, setSearchQuery } = useSearch(); // Использование кастомного хука useSearch для доступа к поисковому запросу и функции для его изменения
  const [showSearchInput, setShowSearchInput] = useState(false); // Использование хука состояния для отображения или скрытия поля ввода
  const inputRef = useRef<HTMLInputElement>(null); // Использование хука useRef для доступа к DOM-элементу поля ввода

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Обработчик изменения поля ввода
    setSearchQuery(event.target.value); // Установка нового значения поискового запроса
  };

  const handleSearchSubmit = (event: React.FormEvent) => { // Обработчик отправки формы
    event.preventDefault(); // Предотвращение стандартного поведения формы
    if (searchQuery.trim() !== "") { // Если поисковый запрос не пустой...
        onChangePage("Search"); // ...вызывается функция для изменения страницы.
    }
  };

  useEffect(() => { // Использование хука эффекта для фокусировки на поле ввода при его отображении
    if (showSearchInput && inputRef.current) { // Если поле ввода отображается и ссылка на него существует...
      inputRef.current.focus(); // ...устанавливается фокус на поле ввода
    }
  }, [showSearchInput]); // Эффект зависит от состояния showSearchInput

  return ( // Возвращение JSX.
    <div className="search-container">
      {showSearchInput && ( // Если поле ввода должно отображаться...
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
      )}
      <button
        className={`search-button`}
        onClick={() => setShowSearchInput(!showSearchInput)} // При клике на кнопку состояние showSearchInput инвертируется
      ></button>
    </div>
  );
};

export default SearchButton;

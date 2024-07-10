import "../styles/BurgerMenu.scss";
import DarkModeToggle from "./DarkModeToggle";
import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTokenChecker from "../customHooks/useTokenChecker";

const BurgerMenu = () => {
  // Использование хука useState для управления состоянием открытия/закрытия меню
  const [isOpen, setIsOpen] = useState(false);
  // Использование хука useRef для ссылки на элементы меню и кнопки
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  // Использование хука useNavigate для перехода на другие страницы
  const navigate = useNavigate();
  // Проверяем валидность токенов
  const isValid = useTokenChecker();

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Функция для обработки клика по кнопке "Home"
  const handleHomeClick = () => {
    navigate("/posts"); // Переход на страницу постов
    setIsOpen(false); // Закрытие меню
  };

  // Функция для обработки клика по кнопке "Add post"
  const handleAddPostClick = () => {
    navigate("/add-post"); // Переход на страницу постов
    setIsOpen(false); // Закрытие меню
  };

  // Функция для обработки клика по кнопке "My posts"
  const handleMyPostsClick = () => {
    navigate("/my-posts"); // Переход на страницу постов
    setIsOpen(false); // Закрытие меню
  };

  // Использование хука useEffect для обработки клика вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Закрытие меню при клике вне меню
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Добавление обработчика событий при открытии меню
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Удаление обработчика событий при закрытии меню
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Удаление обработчика событий при размонтировании компонента
    };
  }, [isOpen]); // Зависимость от состояния isOpen

  return (
    <Fragment>
      <div
        ref={buttonRef} // Ссылка на кнопку
        onClick={toggleMenu} // Обработчик клика по кнопке
        className={`header__toggle-menu ${isOpen ? "open" : ""}`}
      >
        <div className={`header__toggle-item ${isOpen ? "open" : ""}`}></div>
      </div>
      <ul
        ref={menuRef}
        className={`header__toggle-list ${isOpen ? "open" : ""}`}
      >
        <li
          onClick={() => handleHomeClick()}
          className="header__toggle-list-item"
        >
          Home
        </li>
        {isValid && (
          <>
            <li
              onClick={() => handleAddPostClick()}
              className="header__toggle-list-item"
            >
              Add post
            </li>
            <li
              onClick={() => handleMyPostsClick()}
              className="header__toggle-list-item"
            >
              My posts
            </li>
          </>
        )}
        <li className="header__toggle-list-item-empty"></li>
        <DarkModeToggle />
      </ul>
    </Fragment>
  );
};

export default BurgerMenu;

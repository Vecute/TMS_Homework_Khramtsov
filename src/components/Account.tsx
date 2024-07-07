import { useEffect, useState } from "react";
import "../styles/Account.scss";
import "../styles/AccountModal.scss";
import { useNavigate } from "react-router-dom";
import { clearTokens, getAccessToken } from "../services/authToken";
import { useHttp } from "../services/authToken";

const AccountButton = () => {
  const navigate = useNavigate(); // Создаем объект для навигации
  const http = useHttp(); // Получаем хук для выполнения HTTP-запросов
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false); // Создаем состояние для управления видимостью модального окна
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null); // Создаем состояние для хранения данных пользователя

  const handleButtonClick = async () => {
    const token = getAccessToken(); // Получаем access_token
    if (token) {
      setIsAccountModalOpen(true); // Открываем модальное окно
      
      try {
        const response = await http(
          "https://studapi.teachmeskills.by/auth/users/me/",
          {
            method: "GET",
          }
        ); // Выполняем запрос на получение данных пользователя
        const data = await response.json();
        setUserData({ name: data.username, email: data.email }); // Устанавливаем данные пользователя в состояние
      } catch (error) {
        console.error("Error fetching user data:", error); // Логируем ошибку
      }
    } else {
      navigate("/sign-in"); // Если токен отсутствует, перенаправляем на страницу входа
    }
  };

  const handleCloseAccountModal = () => {
    // Обработчик закрытия модального окна
    const modal = document.querySelector('.account-modal');
    if (modal) {
      modal.classList.add("hidden"); // Добавляем класс hidden для анимации закрытия
    }
    setTimeout(() => {
      setIsAccountModalOpen(false); // Закрываем модальное окно с задержкой, чтобы успела отработать анимация
    }, 300);
  };

  const handleLogOut = () => {
    // Обработчик выхода из аккаунта
    setIsAccountModalOpen(false); // Закрываем модальное окно
    clearTokens(); // Очищаем токены
    navigate("/posts"); // Перенаправляем на страницу постов
  };

  useEffect(() => {
    // useEffect для закрытия модального окна при клике вне модального окна
    const handleClickOutside = (event: MouseEvent) => {
      const accountModal = document.querySelector(".account-modal__content");
      if (accountModal && !accountModal.contains(event.target as Node)) {
        handleCloseAccountModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect, который запрещает прокрутку страницы, когда модальное окно открыто
  useEffect(() => {
    if (isAccountModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isAccountModalOpen]);

  return (
    <>
      <button onClick={handleButtonClick} className="account-button">
        <svg viewBox="0 0 24 24">
          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 19 3.29 20.93 5.56 21.66C6.22 21.89 6.98 22 7.81 22H16.19C17.02 22 17.78 21.89 18.44 21.66C20.71 20.93 22 19 22 16.19V7.81C22 4.17 19.83 2 16.19 2ZM20.5 16.19C20.5 18.33 19.66 19.68 17.97 20.24C17 18.33 14.7 16.97 12 16.97C9.3 16.97 7.01 18.32 6.03 20.24H6.02C4.35 19.7 3.5 18.34 3.5 16.2V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V16.19Z" />
          <path d="M12.0019 8C10.0219 8 8.42188 9.6 8.42188 11.58C8.42188 13.56 10.0219 15.17 12.0019 15.17C13.9819 15.17 15.5819 13.56 15.5819 11.58C15.5819 9.6 13.9819 8 12.0019 8Z" />
        </svg>
      </button>
      {isAccountModalOpen && (
        <div className="account-modal__wrapper">
          <div className="account-modal">
            <div
              className="account-modal__button-wrapper"
              onClick={handleCloseAccountModal}
            >
              <div className="account-modal__button"></div>
            </div>
            <div className="account-modal__content">
              <div className="account-modal__title">Your profile</div>
              {userData ? (
                <>
                  <div className="account-modal__data">
                    Name:{" "}
                    <span className="account-modal__values">
                      {userData.name}
                    </span>
                  </div>
                  <div className="account-modal__data">
                    Email:{" "}
                    <span className="account-modal__values">
                      {userData.email}
                    </span>
                  </div>
                </>
              ) : (
                <div>Loading...</div>
              )}
              <button
                className="account-modal__button-logout"
                onClick={handleLogOut}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountButton;
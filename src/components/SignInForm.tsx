import React, { useEffect, useRef, useState } from "react";
import "../styles/SignInForm.scss";
import useInput from "../customHooks/useInput";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUserMailConfirmation } from "../redux/userMailConfirmationReducer";
import { setAccessToken, setRefreshToken } from "../services/authToken";
import { useHttp } from "../services/authToken";
import Alert from "./Alert";

// Интерфейс для пропсов компонента
interface SignInFormProps {
  onSubmit: (value: string) => void;
}

const SignInForm = (props: SignInFormProps) => {
  // Получаем email из Redux-состояния
  const userEmail = useSelector(
    (state: RootState) => state.userMailConfirmationReducer.userEmail
  );

  // Используем кастомный хук useInput для управления полями ввода email и password
  const email = useInput(userEmail ?? "");
  const password = useInput("");

  // Хуки для навигации и dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем хук для выполнения HTTP-запросов
  const http = useHttp(); // Получаем хук для выполнения HTTP-запросов

  // Состояния для отображения алерта и отслеживания первичной загрузки
  const [showAlert, setShowAlert] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Состояние для хранения сообщений об ошибках
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Состояния для цвета алерта
  const [alertColor, setAlertColor] = useState(
    "var(--alert-background-error-color)"
  );

  // Создаем ref для хранения ссылки на элемент, который нужно сфокусировать
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // При монтировании компонента устанавливаем фокус на первый инпут либо на второй, если есть почта
    if (isInitialRender && password.ref.current && userEmail) {
      password.ref.current.focus();
      setIsInitialRender(false);
    } else if (isInitialRender && email.ref.current) {
      email.ref.current.focus();
      setIsInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Выполняем useEffect только один раз при монтировании

  // Обработчик отправки формы
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Отменяем стандартное поведение формы при отправке, чтобы страница не перезагружалась

    // Сбрасываем сообщения об ошибках
    setErrors({ email: "", password: "" });

    let isValid = true; // Переменная для отслеживания валидности всех полей формы
    focusRef.current = null; // Сбрасываем ссылку на элемент, который нужно будет сфокусировать

    // Валидация email
    if (email.value === "") {
      setErrors((prevErrors) => ({ // Если поле email пустое:
        ...prevErrors, // Сохраняем предыдущие ошибки
        email: "Email is required", // Устанавливаем сообщение об ошибке для email
      }));
      isValid = false; // Помечаем форму как невалидную
      email.setIsValid(false) // Устанавливаем состояние валидности email в false
      focusRef.current = email.ref.current; // Устанавливаем фокус на поле email
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {// Если email не соответствует регулярному выражению:
      setErrors((prevErrors) => ({
        ...prevErrors, // Сохраняем предыдущие ошибки
        email: "Invalid email format", // Устанавливаем сообщение об ошибке для email
      }));
      isValid = false; // Помечаем форму как невалидную
      email.setIsValid(false) // Устанавливаем состояние валидности email в false
      focusRef.current = email.ref.current; // Устанавливаем фокус на поле email
    } else { // Если email валидный:
      email.setIsValid(true) // Устанавливаем состояние валидности email в true
    }

    // Валидация пароля
    if (password.value === "") { // Если поле пароля пустое:
      setErrors((prevErrors) => ({
        ...prevErrors, // Сохраняем предыдущие ошибки
        password: "Password is required", // Устанавливаем сообщение об ошибке для пароля
      }));
      password.setIsValid(false); // Устанавливаем состояние валидности пароля в false
      isValid = false; // Помечаем форму как невалидную
      if (!focusRef.current) { // Если фокус еще не установлен ни на одно поле:
        focusRef.current = password.ref.current; // Устанавливаем фокус на поле пароля
      }
    } else if (password.value.length < 8) { // Если длина пароля меньше 8 символов:
      setErrors((prevErrors) => ({
        ...prevErrors, // Сохраняем предыдущие ошибки
        password: "Password must be at least 8 characters long", // Устанавливаем сообщение об ошибке для пароля
      }));
      isValid = false; // Помечаем форму как невалидную
      password.setIsValid(false); // Устанавливаем состояние валидности пароля в false
      if (!focusRef.current) {// Если фокус еще не установлен ни на одно поле:
        focusRef.current = password.ref.current; // Устанавливаем фокус на поле пароля
      }
    } else { // Если пароль валидный:
      password.setIsValid(true) // Устанавливаем состояние валидности пароля в true
    }

    if (isValid) {
      try {
        // Выполняем запрос на сервер для аутентификации
        const response = await http(
          "https://studapi.teachmeskills.by/auth/jwt/create/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          }
        );

        const data = await response.json(); // Получаем данные ответа
        setAccessToken(data.access); // Устанавливаем access_token
        setRefreshToken(data.refresh); // Устанавливаем refresh_token
        dispatch(setUserMailConfirmation(null)); // Сбрасываем email из состояния Redux
        navigate("/posts"); // Перенаправляем на страницу постов
      } catch (error) {
        setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
        setShowAlert(true); // Выводим алерт с сообщением об ошибке
      }
    } else if (focusRef.current) {
      focusRef.current.focus(); // Фокусируем первое невалидное поле
    }
  };

  const handleCloseAlert = () => {
    // Функция для закрытия алерта
    setShowAlert(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signInForm">
        <div className="signInForm__input-container">
          <label htmlFor="email" className="signInForm__label">
            Email
          </label>
          <input
            ref={email.ref}
            type="email"
            id="email"
            value={userEmail ?? email.value}
            onChange={email.onChange}
            placeholder="Your email"
            className={`signInForm__input ${!email.isValid ? "invalid" : ""}`}
            autoComplete="username"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="signInForm__input-container">
          <label htmlFor="password" className="signInForm__label">
            Password
          </label>
          <input
            ref={password.ref}
            type="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
            placeholder="Your password"
            className={`signInForm__input ${
              !password.isValid ? "invalid" : ""
            }`}
            autoComplete="current-password"
          />
                  {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <Link to="/sign-up" className="links signInForm__forgot">
          Forgot password?
        </Link>
        <button type="submit" className="signInForm__button">
          Sign In
        </button>
        <p className="signInForm__signUp">
          Don't have an account?{" "}
          <Link to="/sign-up" className="links">
            Sign Up
          </Link>
        </p>
      </form>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
      {showAlert && (
        <Alert
          text="Authentication failed: check your credentials"
          onClose={handleCloseAlert}
          color={alertColor}
        />
      )}
    </div>
  );
};

export default SignInForm;
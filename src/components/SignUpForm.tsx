import "../styles/SignUpForm.scss";
import useInput from "../customHooks/useInput";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserMailConfirmation } from "../redux/userMailConfirmationReducer";

// Определение интерфейса для свойств формы регистрации
interface SignUpFormProps {
  onSubmit: (value: string) => void;
}

const SignUpForm = (props: SignUpFormProps) => {
  // Использование пользовательского хука для управления вводом для каждого поля ввода
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");
  const navigate = useNavigate(); // Хук для навигации по маршрутам
  const dispatch = useDispatch(); // Использование useDispatch для создания функции dispatch

  // Создание ссылки для фокусировки на элементе ввода
  const focusRef = useRef<HTMLInputElement | null>(null);
  // Состояние для отслеживания первого рендеринга
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Состояние для хранения сообщений об ошибках
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Хук эффекта для установки фокуса на первое поле ввода при первом рендеринге
  useEffect(() => {
    if (isInitialRender && name.ref.current) {
      name.ref.current.focus();
      setIsInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик отправки формы
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращение стандартного поведения формы

    // Сбрасываем сообщения об ошибках
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    let isValid = true; // Переменная для проверки валидности формы
    focusRef.current = null; // Сброс ссылки на элемент для фокусировки

    // Валидация имени
    if (name.value.trim() === "") { // Проверяем, пустое ли поле имени после удаления пробелов с начала и конца строки
      setErrors((prevErrors) => ({
        ...prevErrors, // Сохраняем предыдущие ошибки
        name: "Name is required", // Устанавливаем сообщение об ошибке для имени
      }));
      name.setIsValid(false); // Устанавливаем состояние валидности имени в false
      isValid = false; // Помечаем форму как невалидную
      focusRef.current = name.ref.current; // Устанавливаем фокус на поле имени
    } else {
      name.setIsValid(true); // Если имя валидное, устанавливаем состояние валидности в true
    }

    // Валидация email
    if (email.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
      isValid = false;
      email.setIsValid(false);
      if (!focusRef.current) { // Если фокус еще не установлен, устанавливаем его на поле email
        focusRef.current = email.ref.current;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { // Проверяем, соответствует ли email регулярному выражению
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      isValid = false;
      email.setIsValid(false);
      if (!focusRef.current) {
        focusRef.current = email.ref.current;
      }
    } else {
      email.setIsValid(true);
    }

    // Валидация пароля
    if (password.value === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      password.setIsValid(false);
      isValid = false;
      if (!focusRef.current) {
        focusRef.current = password.ref.current;
      }
    } else if (password.value.length < 8) { // Проверяем длину пароля
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      isValid = false;
      password.setIsValid(false);
      if (!focusRef.current) {
        focusRef.current = password.ref.current;
      }
    } else {
      password.setIsValid(true);
    }

    // Валидация подтверждения пароля
    if (confirmPassword.value === "") { // Проверяем, пустое ли поле подтверждения пароля
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password is required",
      }));
      confirmPassword.setIsValid(false);
      isValid = false;
      if (!focusRef.current) {
        focusRef.current = confirmPassword.ref.current;
      }
    } else if (password.value !== confirmPassword.value) { // Сравниваем пароль и подтверждение пароля
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      confirmPassword.setIsValid(false);
      isValid = false;
      if (!focusRef.current) {
        focusRef.current = confirmPassword.ref.current;
      }
    } else {
      confirmPassword.setIsValid(true);
    }

    // Если форма валидна, выводим значения полей ввода и переходим на страницу подтверждения регистрации
    if (isValid) {
      try {
        const response = await fetch(
          "https://studapi.teachmeskills.by/auth/users/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: name.value,
              email: email.value,
              password: password.value,
              name: name.value,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Registration successful!:", data);
        navigate("/registration-validation");
        dispatch(setUserMailConfirmation(email.value)); // Отправляем значение почты в redux
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else if (focusRef.current) {
      focusRef.current.focus(); // Установка фокуса на первое невалидное поле ввода
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="signUpForm__input-container">
          <label htmlFor="name" className="signUpForm__label">
            Name
          </label>
          <input
            ref={name.ref}
            type="text"
            id="name"
            value={name.value}
            onChange={name.onChange}
            placeholder="Your name"
            className={`signUpForm__input ${!name.isValid ? "invalid" : ""}`}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="email" className="signUpForm__label">
            Email
          </label>
          <input
            ref={email.ref}
            type="email"
            id="email"
            value={email.value}
            onChange={email.onChange}
            placeholder="Your email"
            className={`signUpForm__input ${!email.isValid ? "invalid" : ""}`}
            autoComplete="username"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="password" className="signUpForm__label">
            Password
          </label>
          <input
            ref={password.ref}
            type="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
            placeholder="Your password"
            className={`signUpForm__input ${
              !password.isValid ? "invalid" : ""
            }`}
            autoComplete="new-password"
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="confirm-password" className="signUpForm__label">
            Confirm password
          </label>
          <input
            ref={confirmPassword.ref}
            type="password"
            id="confirm-password"
            value={confirmPassword.value}
            onChange={confirmPassword.onChange}
            placeholder="Confirm password"
            className={`signUpForm__input ${
              !confirmPassword.isValid ? "invalid" : ""
            }`}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div className="error-message">{errors.confirmPassword}</div>
          )}
        </div>
        <button type="submit" className="signUpForm__button">
          Sign Up
        </button>
        <p className="signUpForm__signIn">
          Already have an account?{" "}
          <Link to="/sign-in" className="links">
            Sign In
          </Link>
        </p>
      </form>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
    </div>
  );
};

export default SignUpForm;
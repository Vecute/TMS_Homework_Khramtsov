import "../styles/SignUpForm.scss";
import useInput from "../customHooks/useInput";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  // Массив, содержащий все поля ввода
  const inputs = [name, email, password, confirmPassword];

  // Создание ссылки для фокусировки на элементе ввода
  const focusRef = useRef<HTMLInputElement | null>(null);
  // Состояние для отслеживания первого рендеринга
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Хук эффекта для установки фокуса на первое поле ввода при первом рендеринге
  useEffect(() => {
    if (isInitialRender && name.ref.current) {
      name.ref.current.focus();
      setIsInitialRender(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Предотвращение стандартного поведения формы

    let isValid = true; // Переменная для проверки валидности формы
    focusRef.current = null; // Сброс ссылки на элемент для фокусировки

    // Проверка каждого поля ввода на пустоту
    for (const input of inputs) {
      if (input.value === "") {
        input.setIsValid(false); // Установка состояния валидности в false
        isValid = false; // Установка валидности формы в false
        if (!focusRef.current) {
          focusRef.current = input.ref.current; // Установка ссылки на первое невалидное поле ввода
        }
      } else {
        input.setIsValid(true); // Установка состояния валидности в true
      }
    }

    // Если форма валидна, выводим значения полей ввода и переходим на страницу подтверждения регистрации
    if (isValid) {
      console.log("Name:", name.value);
      console.log("Email:", email.value);
      console.log("Password:", password.value);
      console.log("Confirm Password:", confirmPassword.value);
      navigate("/registration-confirmation");
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
            className={`signUpForm__input ${!name.isValid ? 'invalid' : ''}`}
          />
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
            className={`signUpForm__input ${!email.isValid ? 'invalid' : ''}`}
          />
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
            className={`signUpForm__input ${!password.isValid ? 'invalid' : ''}`}
          />
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
            className={`signUpForm__input ${!confirmPassword.isValid ? 'invalid' : ''}`}
          />
        </div>
        <button type="submit" className="signUpForm__button">Sign Up</button>
        <p className="signUpForm__signIn">
          Already have an account? <Link to="/sign-in" className='links'>Sign In</Link>
        </p>
      </form>
      <button onClick={() => navigate("/posts")} className='buttonBack'>Return to posts</button>
    </div>
  );
};

export default SignUpForm;
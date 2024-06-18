import React, { useEffect, useRef, useState } from "react";
import "../styles/SignInForm.scss";
import useInput from "../customHooks/useInput";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUserMailConfirmation } from "../redux/userMailConfirmationReducer";

interface SignInFormProps {
  onSubmit: (value: string) => void;
}

const SignInForm = (props: SignInFormProps) => {
  const userEmail = useSelector(
    (state: RootState) => state.userMailConfirmationReducer.userEmail
  ); // Использование хука useSelector для получения пользовательского email из состояния Redux
  const email = useInput(userEmail ?? ""); // Используем кастомный хук для управления значением поля ввода email
  const password = useInput(""); // Используем кастомный хук для управления значением поля ввода password
  const navigate = useNavigate(); // Используем хук для навигации по страницам
  const inputs = [email, password]; // Создаем массив из полей ввода
  const dispatch = useDispatch() // Использование useDispatch для создания функции dispatch

  const focusRef = useRef<HTMLInputElement | null>(null);

  // Создаем состояние для отслеживания первичной загрузки
  const [isInitialRender, setIsInitialRender] = useState(true);

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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Отменяем стандартное поведение формы при отправке, чтобы страница не перезагружалась

    let isValid = true; // Переменная для отслеживания валидности всех полей формы
    focusRef.current = null; // Сбрасываем ссылку на элемент, который нужно будет сфокусировать

    for (const input of inputs) {
      // Проходим по каждому полю ввода в форме
      if (input.value === "") {
        // Если поле ввода пустое...
        input.setIsValid(false); // ...то устанавливаем его состояние как невалидное...
        isValid = false; // ...и общее состояние валидности формы делаем невалидным
        if (!focusRef.current) {
          // Если еще не установлена ссылка на элемент для фокуса...
          focusRef.current = input.ref.current; // ...то устанавливаем ее на текущее поле ввода
        }
      } else {
        // Если поле ввода не пустое...
        input.setIsValid(true); // ...то устанавливаем его состояние как валидное
      }
    }

    if (isValid) {
      // Если все поля формы валидны...
      console.log("Email:", email.value); // ...то выводим в консоль значение поля ввода email...
      console.log("Password:", password.value); // ...и значение поля ввода password...
      dispatch(setUserMailConfirmation(null)) // Отправляем значение почты в redux
      navigate("/posts"); // ...и переходим на страницу с постами
    } else if (focusRef.current) {
      // Если есть ссылка на элемент для фокуса...
      focusRef.current.focus(); // ...то устанавливаем на него фокус
    }
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
          />
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
          />
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
    </div>
  );
};

export default SignInForm;

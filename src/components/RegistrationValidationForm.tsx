import "../styles/RegistrationValidationForm.scss";
import useInput from "../customHooks/useInput";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Alert from "./Alert";

// Определение интерфейса для свойств формы регистрации
interface RegistrationValidationFormProps {
  onSubmit: (value: string) => void;
}

const RegistrationValidationForm = (props: RegistrationValidationFormProps) => {
  // Получаем email из Redux-состояния
  const userEmail = useSelector(
    (state: RootState) => state.userMailConfirmationReducer.userEmail
  );

  // Используем кастомный хук useInput для управления полями ввода
  const uid = useInput("");
  const token = useInput("");

  // Массив с полями ввода
  const inputs = [uid, token];

  // Хук для навигации по маршрутам
  const navigate = useNavigate(); 

  // Состояния для отображения алерта и отслеживания первичной загрузки
  const [showAlert, setShowAlert] = useState(false);

  // Создание ссылки для фокусировки на элементе ввода
  const focusRef = useRef<HTMLInputElement | null>(null);

  // Состояние для отслеживания первого рендеринга
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Хук эффекта для установки фокуса на первое поле ввода при первом рендеринге
  useEffect(() => {
    if (isInitialRender && uid.ref.current) {
      uid.ref.current.focus();
      setIsInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик отправки формы
  const handleSubmit = async (event: React.FormEvent) => {
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
      try {
        const response = await fetch(
          "https://studapi.teachmeskills.by/auth/users/activation/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              uid: uid.value,
              token: token.value,
            }),
          }
        );

        if (response.status === 204) {
          console.log("Validation successful!");
          navigate("/success");
          return;
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Validation error:", error);
        setShowAlert(true);
      }
    } else if (focusRef.current) {
      focusRef.current.focus(); // Установка фокуса на первое невалидное поле ввода
    }
  };

  const handleCloseAlert = () => { // Функция для закрытия алерта
    setShowAlert(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="registrationValidationForm">
        <p className="registration__text">
          We have sent an email to{" "}
          <span className="registration__email">{userEmail}</span> to confirm
          registration. Check your incoming messages and use the values from the
          sent link to fill out the verification form.
        </p>
        <div className="registrationValidationForm__input-container">
          <label htmlFor="uid" className="registrationValidationForm__label">
            uid
          </label>
          <input
            ref={uid.ref}
            type="text"
            id="uid"
            value={uid.value}
            onChange={uid.onChange}
            placeholder="value between the last and penultimate slash"
            className={`registrationValidationForm__input ${
              !uid.isValid ? "invalid" : ""
            }`}
          />
        </div>
        <div className="registrationValidationForm__input-container">
          <label htmlFor="token" className="registrationValidationForm__label">
            token
          </label>
          <input
            ref={token.ref}
            type="token"
            id="token"
            value={token.value}
            onChange={token.onChange}
            placeholder="value after the last slash"
            className={`registrationValidationForm__input ${
              !token.isValid ? "invalid" : ""
            }`}
          />
        </div>
        <button type="submit" className="registration__button">
          I entered the data to confirm the registration
        </button>
      </form>
      <button onClick={() => navigate("/posts")} className="buttonBack">
        Return to posts
      </button>
      {showAlert && (
        <Alert
          text="Please check the entered data"
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

export default RegistrationValidationForm;
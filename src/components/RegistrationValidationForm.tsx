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

  // Состояние для хранения сообщений об ошибках
  const [errors, setErrors] = useState({ uid: "", token: "" });

  // Хук для навигации по маршрутам
  const navigate = useNavigate();

  // Состояния для отображения алерта и отслеживания первичной загрузки
  const [showAlert, setShowAlert] = useState(false);
  // Состояния для цвета алерта
  const [alertColor, setAlertColor] = useState(
    "var(--alert-background-error-color)"
  );

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

    // Сбрасываем сообщения об ошибках
    setErrors({ uid: "", token: "" });

    let isValid = true; // Переменная для проверки валидности формы
    focusRef.current = null; // Сброс ссылки на элемент для фокусировки

    // Валидация uid
    if (uid.value.trim() === "") { // Проверяем, пустое ли поле uid после удаления пробелов с начала и конца строки
      setErrors((prevErrors) => ({
        ...prevErrors, // Сохраняем предыдущие ошибки
        uid: "UID is required", // Устанавливаем сообщение об ошибке для uid
      }));
      uid.setIsValid(false); // Устанавливаем состояние валидности uid в false
      isValid = false; // Помечаем форму как невалидную
      focusRef.current = uid.ref.current; // Устанавливаем фокус на поле uid
    } else {
      uid.setIsValid(true); // Если uid валидный, устанавливаем состояние валидности в true
    }

    // Валидация token
    if (token.value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        token: "Token is required",
      }));
      token.setIsValid(false);
      isValid = false;
      if (!focusRef.current) {  // Если фокус еще не установлен (т.е. поле uid было валидным),
        focusRef.current = token.ref.current; // устанавливаем фокус на поле token
      }
    } else {
      token.setIsValid(true);
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
        setAlertColor("var(--alert-background-error-color)"); // Устанавливаем цвет уведомления
        setShowAlert(true);
      }
    } else if (focusRef.current) {
      focusRef.current.focus(); // Установка фокуса на первое невалидное поле ввода
    }
  };

  const handleCloseAlert = () => {
    // Функция для закрытия алерта
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
          {errors.uid && <div className="error-message">{errors.uid}</div>}
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
          {errors.token && <div className="error-message">{errors.token}</div>}
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
          color={alertColor}
        />
      )}
    </div>
  );
};

export default RegistrationValidationForm;
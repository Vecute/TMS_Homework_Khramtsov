import React, { useEffect } from "react";
import "../styles/SignUpForm.scss";
import useInput from "../customHooks/useInput";

interface SignUpFormProps {
  onChangePage: (value: string) => void;
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onChangePage } = props;
  // Используем кастомный хук useInput для управления состоянием полей ввода
  const name = useInput("");
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  // Создаем массив из объектов, возвращаемых хуком useInput
  const inputs = [name, email, password, confirmPassword];

  // Используем хук useEffect для установки фокуса на первое поле ввода при монтировании компонента
  useEffect(() => {
    if (inputs[0].ref.current) {
      inputs[0].ref.current.focus();
    }
  });

  // Определяем функцию-обработчик события отправки формы
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Проверяем каждое поле ввода на пустоту
    for (const input of inputs) {
      if (input.value === '') {
        // Если поле пустое, устанавливаем его валидность в false и устанавливаем на нем фокус
        input.setIsValid(false);
        if (input.ref.current) {
          input.ref.current.focus();
        }
        return;
      }
      // Если поле не пустое, устанавливаем его валидность в true
      input.setIsValid(true);
    }
    console.log("Name:", name.value);
    console.log("Email:", email.value);
    console.log("Password:", password.value);
    console.log("Confirm Password:", confirmPassword.value);
    // Вызываем функцию onChangePage для перехода на страницу "Registration Confirmation"
    onChangePage("Registration Confirmation");
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
          Already have an account? <span className='links' onClick={() => onChangePage("Sign In")}>Sign In</span>
        </p>
      </form>
      <button onClick={() => onChangePage("Posts")} className='buttonBack'>Return to posts</button>
    </div>
  );
};

export default SignUpForm;
import React, { useEffect } from 'react';
import '../styles/SignInForm.scss';
import useInput from "../customHooks/useInput";

interface SignInFormProps {
  onChangePage: (value: string) => void;
}

const SignInForm = (props: SignInFormProps) => {
  const { onChangePage } = props;
  // Используем кастомный хук useInput для управления состоянием полей ввода
  const email = useInput('');
  const password = useInput('');

  // Создаем массив из объектов, возвращаемых хуком useInput
  const inputs = [email, password];

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
    console.log('Email:', email.value);
    console.log('Password:', password.value);
    // Вызываем функцию onChangePage для перехода на страницу "Posts"
    onChangePage("Posts");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='signInForm'>
        <div className='signInForm__input-container'>
          <label htmlFor="email" className='signInForm__label'>Email</label>
          <input
            ref={email.ref}
            type="email"
            id="email"
            value={email.value}
            onChange={email.onChange}
            placeholder="Your email"
            className={`signInForm__input ${!email.isValid ? 'invalid' : ''}`}
          />
        </div>
        <div className='signInForm__input-container'>
          <label htmlFor="password" className='signInForm__label'>Password</label>
          <input
            ref={password.ref}
            type="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
            placeholder="Your password"
            className={`signInForm__input ${!password.isValid ? 'invalid' : ''}`}
          />
        </div>
        <span className='signInForm__forgot links' onClick={() => onChangePage("Sign Up")}>Forgot password?</span>
        <button type="submit" className='signInForm__button'>Sign In</button>
        <p className='signInForm__signUp'>
          Don't have an account? <span className='links' onClick={() => onChangePage("Sign Up")}>Sign Up</span>
        </p>
      </form>
      <button onClick={() => onChangePage("Posts")} className='buttonBack'>Return to posts</button>
    </div>
  );
};

export default SignInForm;
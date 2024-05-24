import React, { useState } from 'react';
import '../styles/SignInForm.scss';

interface SignInFormProps {
  onChangePage: (value: string) => void;
}

const SignInForm = (props: SignInFormProps) => {
  const { onChangePage } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Действия для отправки формы. Пока заглушка в консоль
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='signInForm'>
      <div className='signInForm__input-container'>
        <label htmlFor="email" className='signInForm__label'>Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className='signInForm__input'
        />
      </div>
      <div className='signInForm__input-container'>
        <label htmlFor="password" className='signInForm__label'>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          className='signInForm__input'
        />
      </div>
      <a href="#" className='signInForm__forgot'>Forgot password?</a>
      <button type="submit" className='signInForm__button' onClick={() => onChangePage("Posts")}>Sign In</button>
      <p className='signInForm__signUp'>
        Don't have an account? <a href="#" onClick={() => onChangePage("Sign Up")}>Sign Up</a>
      </p>
    </form>
    <button onClick={() => onChangePage("Posts")} className='buttonBack'>Return to posts</button>
    </div>
  );
};

export default SignInForm;
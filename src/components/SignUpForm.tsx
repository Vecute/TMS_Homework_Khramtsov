import React, { useState } from "react";
import "../styles/SignUpForm.scss";

interface SignUpFormProps {
  onChangePage: (value: string) => void;
}

const SignUpForm = (props: SignUpFormProps) => {
  const { onChangePage } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Действия для отправки формы. Пока заглушка в консоль
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signUpForm">
        <div className="signUpForm__input-container">
          <label htmlFor="name" className="signUpForm__label">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="signUpForm__input"
          />
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="email" className="signUpForm__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="signUpForm__input"
          />
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="password" className="signUpForm__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="signUpForm__input"
          />
        </div>
        <div className="signUpForm__input-container">
          <label htmlFor="confirm-password" className="signUpForm__label">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="signUpForm__input"
          />
        </div>
        <button type="submit" className="signUpForm__button" onClick={() => onChangePage("Registration Confirmation")}>
          Sign Up
        </button>
        <p className="signUpForm__signIn">
          Already have an account? <span className='links' onClick={() => onChangePage("Sign In")}>Sign In</span>
        </p>
      </form>
      <button onClick={() => onChangePage("Posts")} className='buttonBack'>Return to posts</button>
    </div>
  );
};

export default SignUpForm;

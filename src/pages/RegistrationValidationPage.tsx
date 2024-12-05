import TemplatePage from "./TemplatePage";
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect } from "react";
import RegistrationValidationForm from "../components/RegistrationValidationForm";

function RegistrationValidationPage() {
  const navigationType = useNavigationType(); // Вызов хука useNavigationType для получения типа навигации
  const navigate = useNavigate(); // Вызов хука useNavigate для получения функции перенаправления

  useEffect(() => {
    if (navigationType !== 'PUSH') { // Если пользователь попал на страницу не через navigate()
      navigate('/'); // Перенаправляем пользователя на главную страницу
    }
  }, [navigationType, navigate]);

const handleSubmit = () => {
    // Обработка отправки формы регистрации
    navigate("/success");
  };

  return (
    <TemplatePage title="Registration Validation">
      <RegistrationValidationForm onSubmit={handleSubmit}/>
    </TemplatePage>
  );
}

export default RegistrationValidationPage;
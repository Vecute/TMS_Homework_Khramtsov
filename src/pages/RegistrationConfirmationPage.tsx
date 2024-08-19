import TemplatePage from "./TemplatePage";
import RegistrationConfirmation from "../components/RegistrationConfirmation";
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect } from "react";

function RegistrationConfirmationPage() {
  const navigationType = useNavigationType(); // Вызов хука useNavigationType для получения типа навигации
  const navigate = useNavigate(); // Вызов хука useNavigate для получения функции перенаправления

  useEffect(() => {
    if (navigationType !== 'PUSH') { // Если пользователь попал на страницу не через navigate()
      navigate('/'); // Перенаправляем пользователя на главную страницу
    }
  }, [navigationType, navigate]);

  return (
    <TemplatePage title="Registration Confirmation">
      <RegistrationConfirmation />
    </TemplatePage>
  );
}

export default RegistrationConfirmationPage;
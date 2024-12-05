import TemplatePage from "./TemplatePage";
import EmailConfirmed from "../components/EmailConfirmed";
import { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

function EmailConfirmedPage() {
  const navigationType = useNavigationType(); // Вызов хука useNavigationType для получения типа навигации
  const navigate = useNavigate(); // Вызов хука useNavigate для получения функции перенаправления

  useEffect(() => {
    if (navigationType !== 'PUSH') { // Если пользователь попал на страницу не через navigate()
      navigate('/'); // Перенаправляем пользователя на главную страницу
    }
  }, [navigationType, navigate]);
  
    return (
      <TemplatePage title="Success">
        <EmailConfirmed />
      </TemplatePage>
    );
  }

export default EmailConfirmedPage
import TemplatePage from "./TemplatePage";
import UserPosts from "../components/UserPosts";
import { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

function UserPostsPage() {
  const navigationType = useNavigationType(); // Вызов хука useNavigationType для получения типа навигации
  const navigate = useNavigate(); // Вызов хука useNavigate для получения функции перенаправления

  useEffect(() => {
    if (navigationType !== 'PUSH') { // Если пользователь попал на страницу не через navigate()
      navigate('/'); // Перенаправляем пользователя на главную страницу
    }
  }, [navigationType, navigate]);
  
    return (
      <TemplatePage title="My posts">
        <UserPosts />
      </TemplatePage>
    );
  }

export default UserPostsPage
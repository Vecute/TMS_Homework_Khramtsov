import React, { useEffect } from "react"; 
import { IconButton } from "@mui/material"; 
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode"; 
import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "../store"; 
import { toggleTheme } from "../store/slices/themeSlice"; 

const ToggleTheme: React.FC = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch для диспатчинга экшенов в хранилище
  const isDarkTheme = useSelector((state: RootState) => state.theme.darkMode); // Используем хук useSelector для получения значения isDarkTheme из хранилища Redux

  const handleThemeToggle = () => { // Определяем функцию handleThemeToggle, которая будет вызываться при клике на кнопку
    dispatch(toggleTheme()); // Диспатчим экшен toggleTheme для изменения темы в хранилище
  };

  useEffect(() => { // Эффект будет срабатывать каждый раз, когда меняется значение isDarkTheme
    const theme = isDarkTheme ? 'dark' : 'light'; // Определяем строковое значение темы
    localStorage.setItem('theme', theme); // Сохраняем значение темы в localStorage
  }, [isDarkTheme]);

  return ( 
    <IconButton 
      sx={{ position: "absolute", top: "10px", right: "10px" }} 
      onClick={handleThemeToggle} 
    >
      {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />} 
    </IconButton>
  );
};

export default ToggleTheme; 
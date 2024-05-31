import React, { useState, useEffect, useCallback, useMemo } from "react";
import ThemeContext from "./ThemeContext";

const lightTheme = 'light';
const darkTheme = 'dark';

// Компонент-провайдер, который оборачивает дочерние компоненты и предоставляет им доступ к состоянию темы
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Используется хук состояния для отслеживания, включен ли темный режим
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    return storedTheme ? storedTheme === darkTheme : prefersDark;
  });

  // Функция для переключения темы
  const toggleTheme = useCallback(() => setIsDarkMode(prevMode => !prevMode), []);

  // Эффект для установки темы в localStorage и атрибуте data-theme корневого элемента при изменении isDarkMode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? darkTheme : lightTheme);
    localStorage.setItem('theme', isDarkMode ? darkTheme : lightTheme);
  }, [isDarkMode]);

  // Используется useMemo для создания объекта контекста, чтобы избежать его пересоздания при каждом рендере
  const contextValue = useMemo(() => ({ isDarkMode, toggleTheme }), [isDarkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider
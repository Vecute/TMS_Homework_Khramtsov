import { createSlice } from "@reduxjs/toolkit";

const darkTheme = 'dark'; // Определяем константу darkTheme со значением 'dark' для удобства сравнения
const storedTheme = localStorage.getItem('theme'); // Получаем сохраненную тему из localStorage
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false; // Проверяем системные настройки пользователя на предмет предпочитаемой темы

const initialTheme = storedTheme ? storedTheme === darkTheme : prefersDark; // Определяем начальное значение темы

interface ThemeState { // Определяем интерфейс ThemeState для типизации состояния темы
  darkMode: boolean; 
}

const initialState: ThemeState = { // Определяем начальное состояние слайса
  darkMode: initialTheme, 
};
export const themeSlice = createSlice({ 
  name: "theme", // Указываем имя слайса
  initialState, // Передаем начальное состояние
  reducers: { 
    // Определяем редьюсеры слайса
    toggleTheme: (state) => { 
      // Редьюсер toggleTheme инвертирует значение state.darkMode
      state.darkMode = !state.darkMode; 
    },
  },
});

export const { toggleTheme } = themeSlice.actions; // Экспортируем функции-экшены, сгенерированные createSlice
export default themeSlice.reducer; 
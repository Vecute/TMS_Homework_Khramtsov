import { createContext } from "react";

// Создание контекста для темы
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
} as {
  isDarkMode: boolean;
  toggleTheme: () => void;
});

export default ThemeContext
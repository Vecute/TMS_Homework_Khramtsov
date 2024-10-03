import { useContext } from "react";
import { SearchContext } from "../components/SearchButton";

const useSearch = () => { // Кастомный хук для использования контекста поиска
    const context = useContext(SearchContext); // Использование хука useContext для доступа к контексту поиска
    if (!context) {
      throw new Error("useSearch must be used within a SearchProvider"); // Если контекст не доступен, выбрасывается ошибка
    }
    return context; // Возвращается контекст
  };

export default useSearch
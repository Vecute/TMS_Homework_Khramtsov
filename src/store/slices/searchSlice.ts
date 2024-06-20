import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для состояния поиска
interface SearchState {
  query: string; // Строка поискового запроса
}

// Определяем начальное состояние слайса поиска
const initialState: SearchState = {
  query: '', // Изначально поисковый запрос пуст
};

const searchSlice = createSlice({
  name: 'search', // Имя слайса, используемое для генерации имен экшенов и редьюсера
  initialState, // Начальное состояние слайса
  reducers: { // Определяем редьюсеры для обработки экшенов
    setSearchQuery(state, action: PayloadAction<string>) { // Редьюсер для установки поискового запроса
      state.query = action.payload; // Обновляем поисковый запрос значением из экшена
    },
  },
});

// Экспортируем функцию-экшен setSearchQuery, сгенерированную createSlice
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer; 
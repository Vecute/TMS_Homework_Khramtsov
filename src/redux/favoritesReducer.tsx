import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип для состояния favoritesReducer
type FavoritesState = {
  [postId: number]: boolean;
};

// Определяем начальное состояние - пустой объект
const initialState: FavoritesState = {};

// Создаем слайс редюсера с помощью createSlice
const favoritesReducer = createSlice({
  name: "favorites", // Имя слайса
  initialState, // Начальное состояние
  reducers: {
    // Редюсер для переключения состояния "в избранном"
    toggleFavorite: (state, action: PayloadAction<number>) => { 
      // action.payload - это ID поста, переданный в экшен
      const postId = action.payload;
      // Изменяем значение state[postId] на противоположное, если пост был в избранном, он будет удален, и наоборот
      state[postId] = !state[postId]; 
    },
  },
});

// Экспорт действия и редюсера
export const { toggleFavorite } = favoritesReducer.actions;
export default favoritesReducer.reducer;
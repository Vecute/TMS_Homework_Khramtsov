import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определяем тип для состояния favoritesReducer
type FavoritesState = {
  [postId: number]: boolean;
};

// Функция для получения избранных постов из localStorage
const getFavoritesFromLocalStorage = (): FavoritesState => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : {};
};

// Функция для сохранения избранных постов в localStorage
const saveFavoritesToLocalStorage = (favorites: FavoritesState) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Определяем начальное состояние, получая данные из localStorage
const initialState: FavoritesState = getFavoritesFromLocalStorage();

// Создаем слайс редюсера с помощью createSlice
const favoritesReducer = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      state[postId] = !state[postId];
      // Сохраняем обновленное состояние в localStorage
      saveFavoritesToLocalStorage(state);
    },
  },
});

export const { toggleFavorite } = favoritesReducer.actions;
export default favoritesReducer.reducer;
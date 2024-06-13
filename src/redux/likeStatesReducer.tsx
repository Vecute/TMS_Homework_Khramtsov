import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа LikeState
type LikeState = "like" | "dislike" | undefined;

// Определение типа LikeStatesState
type LikeStatesState = {
  [postId: number]: LikeState;
};

// Определение начального состояния, которое является пустым объектом
const initialState: LikeStatesState = {};

// Создание редюсера с помощью функции createSlice
const likeStatesReducer = createSlice({
  // Имя редюсера
  name: "likeStates",
  // Начальное состояние
  initialState,
  // Определение редюсеров
  reducers: {
    // Редюсер для установки состояния лайка
    setLikeState: (state, action: PayloadAction<{ postId: number; likeState: LikeState }>) => {
      // Извлечение postId и likeState из payload действия
      const { postId, likeState } = action.payload;
      // Установка нового состояния лайка для данного postId
      state[postId] = likeState;
    },
  },
});

// Экспорт действия и редюсера
export const { setLikeState } = likeStatesReducer.actions;
export default likeStatesReducer.reducer;

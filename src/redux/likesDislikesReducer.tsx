import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа LikesDislikesState
type LikesDislikesState = {
  [postId: number]: {
    likes: number;
    dislikes: number;
  };
};

// Определение начального состояния, которое является пустым объектом
const initialState: LikesDislikesState = {};

// Создание редюсера с помощью функции createSlice
const likesDislikesReducer = createSlice({
  // Имя редюсера
  name: "likesDislikes",
  // Начальное состояние
  initialState,
  // Определение редюсеров
  reducers: {
    // Редюсер для увеличения количества лайков и уменьшения количества дизлайков
    likePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload; // Извлечение postId из payload действия
      // Если для данного postId еще нет данных, то инициализируем их
      if (!state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
      // Увеличиваем количество лайков на 1
      state[postId].likes += 1;
      // Уменьшаем количество дизлайков на 1, но не меньше 0
      state[postId].dislikes = Math.max(state[postId].dislikes - 1, 0);
    },
    // Редюсер для увеличения количества дизлайков и уменьшения количества лайков
    dislikePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload; // Извлечение postId из payload действия
      // Если для данного postId еще нет данных, то инициализируем их
      if (!state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
      // Увеличиваем количество дизлайков на 1
      state[postId].dislikes += 1;
      // Уменьшаем количество лайков на 1, но не меньше 0
      state[postId].likes = Math.max(state[postId].likes - 1, 0);
    },
    // Редюсер для сброса количества лайков и дизлайков
    resetLikesDislikes: (state, action: PayloadAction<number>) => {
      const postId = action.payload; // Извлечение postId из payload действия
      // Если для данного postId есть данные, то сбрасываем их
      if (state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
    },
  },
});

// Экспорт действия и редюсера
export const { likePost, dislikePost, resetLikesDislikes } = likesDislikesReducer.actions;
export default likesDislikesReducer.reducer;
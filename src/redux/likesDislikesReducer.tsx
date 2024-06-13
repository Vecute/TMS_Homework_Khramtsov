import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа LikesDislikesState
type LikesDislikesState = {
  [postId: number]: {
    likes: number;
    dislikes: number;
  };
};

// Функция для получения лайков/дизлайков из localStorage
const getLikesDislikesFromLocalStorage = (): LikesDislikesState => {
  const storedLikesDislikes = localStorage.getItem("likesDislikes");
  return storedLikesDislikes ? JSON.parse(storedLikesDislikes) : {};
};

// Функция для сохранения лайков/дизлайков в localStorage
const saveLikesDislikesToLocalStorage = (likesDislikes: LikesDislikesState) => {
  localStorage.setItem("likesDislikes", JSON.stringify(likesDislikes));
};

// Определение начального состояния, получая данные из localStorage
const initialState: LikesDislikesState = getLikesDislikesFromLocalStorage();

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
      const postId = action.payload; 
      if (!state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
      state[postId].likes += 1;
      state[postId].dislikes = Math.max(state[postId].dislikes - 1, 0);
      // Сохранение обновленного состояния в localStorage
      saveLikesDislikesToLocalStorage(state);
    },
    // Редюсер для увеличения количества дизлайков и уменьшения количества лайков
    dislikePost: (state, action: PayloadAction<number>) => {
      const postId = action.payload; 
      if (!state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
      state[postId].dislikes += 1;
      state[postId].likes = Math.max(state[postId].likes - 1, 0);
      // Сохранение обновленного состояния в localStorage
      saveLikesDislikesToLocalStorage(state);
    },
    // Редюсер для сброса количества лайков и дизлайков
    resetLikesDislikes: (state, action: PayloadAction<number>) => {
      const postId = action.payload; 
      if (state[postId]) {
        state[postId] = { likes: 0, dislikes: 0 };
      }
      // Сохранение обновленного состояния в localStorage
      saveLikesDislikesToLocalStorage(state);
    },
  },
});

// Экспорт действия и редюсера
export const { likePost, dislikePost, resetLikesDislikes } = likesDislikesReducer.actions;
export default likesDislikesReducer.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Определение типа LikeState
type LikeState = "like" | "dislike" | undefined;

// Определение типа LikeStatesState
type LikeStatesState = {
  [postId: number]: LikeState;
};

// Функция для получения состояний лайков из localStorage
const getLikeStatesFromLocalStorage = (): LikeStatesState => {
  const storedLikeStates = localStorage.getItem("likeStates");
  return storedLikeStates ? JSON.parse(storedLikeStates) : {};
};

// Функция для сохранения состояний лайков в localStorage
const saveLikeStatesToLocalStorage = (likeStates: LikeStatesState) => {
  localStorage.setItem("likeStates", JSON.stringify(likeStates));
};

// Определение начального состояния, получая данные из localStorage
const initialState: LikeStatesState = getLikeStatesFromLocalStorage();

// Создание редюсера с помощью функции createSlice
const likeStatesReducer = createSlice({
  name: "likeStates",
  initialState,
  reducers: {
    setLikeState: (state, action: PayloadAction<{ postId: number; likeState: LikeState }>) => {
      const { postId, likeState } = action.payload;
      state[postId] = likeState;
      // Сохранение обновленного состояния в localStorage
      saveLikeStatesToLocalStorage(state);
    },
  },
});

export const { setLikeState } = likeStatesReducer.actions;
export default likeStatesReducer.reducer;
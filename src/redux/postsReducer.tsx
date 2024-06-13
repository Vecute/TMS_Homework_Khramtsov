import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";

// Определяем тип состояния для редюсера постов
interface PostsState {
  posts: PostProps[];
  loading: boolean;
  error: string | null;
}

// Определяем начальное состояние
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Создаем слайс редюсера для постов
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Экшен для установки загрузки
    setPostsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Экшен для успешной загрузки постов
    setPostsSuccess: (state, action: PayloadAction<PostProps[]>) => {
      state.loading = false;
      state.posts = action.payload;
    },
    // Экшен для ошибки загрузки постов
    setPostsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Экспорт действия и редюсера
export const { setPostsLoading, setPostsSuccess, setPostsError } = postsSlice.actions;
export default postsSlice.reducer;
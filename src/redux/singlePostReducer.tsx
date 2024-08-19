import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";
import { fetchPostById } from "../thunk/fetchPostById";

export interface SinglePostState {
  post: PostProps | null; // Объект поста или null, если пост не загружен
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке
}

const initialState: SinglePostState = {
  post: null, // Изначально поста нет
  loading: false, // Пост не загружается
  error: null, // Ошибок нет
};

const singlePostSlice = createSlice({
  name: "singlePost", // Название
  initialState, // Начальное состояние
  reducers: {},
  extraReducers: (builder) => { // Обработчики для асинхронных экшенов (thunk)
    builder
      .addCase(fetchPostById.pending, (state) => { // Обработка состояния "загрузка" (pending)
        state.loading = true; // Устанавливаем флаг загрузки в true
        state.error = null; // Очищаем сообщение об ошибке
      })
      .addCase(fetchPostById.fulfilled, (state, action) => { // Обработка успешного завершения запроса (fulfilled)
        state.loading = false; // Устанавливаем флаг загрузки в false
        state.post = action.payload; // Сохраняем полученный пост в состоянии
      })
      .addCase(fetchPostById.rejected, (state, action) => { // Обработка ошибки при запросе (rejected)
        state.loading = false; // Устанавливаем флаг загрузки в false
        // Сохраняем сообщение об ошибке, если оно есть, иначе - "Unknown error occurred."
        state.error = action.error?.message || "Unknown error occurred.";
      });
  },
});

export default singlePostSlice.reducer; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для поста
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Определяем интерфейс для состояния слайса постов
interface PostState {
  posts: Post[]; // Массив постов
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если есть
}

// Определяем начальное состояние слайса
const initialState: PostState = {
  posts: [], // Изначально постов нет
  loading: false, // Загрузка неактивна
  error: null, // Ошибок нет
};

const postSlice = createSlice({
  name: 'posts', // Имя слайса, используемое для генерации имен экшенов и редьюсеров
  initialState, // Начальное состояние слайса
  reducers: { 
    // Определяем редьюсеры для обработки экшенов
    fetchPostsStart(state) { // Редьюсер для начала загрузки постов
      state.loading = true; // Устанавливаем флаг загрузки в true
      state.error = null; // Очищаем сообщение об ошибке
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) { // Редьюсер для успешной загрузки постов
      state.posts = action.payload; // Обновляем массив постов данными из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
    fetchPostsFailure(state, action: PayloadAction<string>) { // Редьюсер для обработки ошибки при загрузке постов
      state.error = action.payload; // Устанавливаем сообщение об ошибке из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
  },
});

// Экспортируем функции-экшены, сгенерированные createSlice
export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postSlice.actions;
export default postSlice.reducer; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для пользователя
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Определяем интерфейс для состояния слайса пользователей
interface UserState {
  users: User[]; // Массив пользователей
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если есть
}

// Определяем начальное состояние слайса пользователей
const initialState: UserState = {
  users: [], // Изначально пользователей нет
  loading: false, // Загрузка неактивна
  error: null, // Ошибок нет
};

const userSlice = createSlice({
  name: 'users', // Имя слайса, используемое для генерации имен экшенов и редьюсера
  initialState, // Начальное состояние слайса
  reducers: { // Определяем редьюсеры для обработки экшенов
    fetchUsersStart(state) { // Редьюсер для начала загрузки пользователей
      state.loading = true; // Устанавливаем флаг загрузки в true
      state.error = null; // Очищаем сообщение об ошибке
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) { // Редьюсер для успешной загрузки пользователей
      state.users = action.payload; // Обновляем массив пользователей данными из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
    fetchUsersFailure(state, action: PayloadAction<string>) { // Редьюсер для обработки ошибки при загрузке пользователей
      state.error = action.payload; // Устанавливаем сообщение об ошибке из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
  },
});

// Экспортируем функции-экшены, сгенерированные createSlice
export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;
export default userSlice.reducer; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем интерфейс для задачи
export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// Определяем интерфейс для состояния слайса задач
interface TodoState {
  todos: Todo[]; // Массив задач
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если есть
}

// Определяем начальное состояние слайса
const initialState: TodoState = {
  todos: [], // Изначально задач нет
  loading: false, // Загрузка неактивна
  error: null, // Ошибок нет
};

const todoSlice = createSlice({
  name: 'todos', // Имя слайса, используемое для генерации имен экшенов и редьюсера
  initialState, // Начальное состояние слайса
  reducers: { // Определяем редьюсеры для обработки экшенов
    fetchTodosStart(state) { // Редьюсер для начала загрузки задач
      state.loading = true; // Устанавливаем флаг загрузки в true
      state.error = null; // Очищаем сообщение об ошибке
    },
    fetchTodosSuccess(state, action: PayloadAction<Todo[]>) { // Редьюсер для успешной загрузки задач
      state.todos = action.payload; // Обновляем массив задач данными из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
    fetchTodosFailure(state, action: PayloadAction<string>) { // Редьюсер для обработки ошибки при загрузке задач
      state.error = action.payload; // Устанавливаем сообщение об ошибке из экшена
      state.loading = false; // Сбрасываем флаг загрузки
    },
  },
});

// Экспортируем функции-экшены, сгенерированные createSlice
export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure } = todoSlice.actions;
export default todoSlice.reducer;
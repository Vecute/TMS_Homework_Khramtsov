import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";
import { fetchAllPosts } from "../thunk/fetchAllPosts";

interface PostsState {
  allPosts: PostProps[]; // Массив всех постов
  posts: PostProps[]; // Массив постов для текущей страницы
  currentPage: number; // Номер текущей страницы
  postsPerPage: number; // Количество постов на странице
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке
  activeTab: "all" | "favorites"; // Активная вкладка ("все" или "избранные")
}

// Функция для получения значения из localStorage
const getFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key); // Получаем значение по ключу
  return storedValue ? JSON.parse(storedValue) : defaultValue; // Возвращаем значение, если оно есть, иначе - значение по умолчанию
};

// Функция для сохранения значения в localStorage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value)); // Сохраняем значение по ключу
};

const initialState: PostsState = {
  allPosts: getFromLocalStorage("allPosts", []), // Пытаемся получить все посты из localStorage, если их нет - пустой массив
  posts: [], // Изначально нет постов для отображения
  currentPage: 1, // Текущая страница - 1
  postsPerPage: getFromLocalStorage("postsPerPage", 20), // Пытаемся получить количество постов на странице из localStorage, по умолчанию - 20
  loading: false, // Данные не загружаются
  error: null, // Нет ошибки
  activeTab: "all", // Активная вкладка - "все"
};

const postsSlice = createSlice({
  name: "posts", // Название
  initialState, // Начальное состояние
  reducers: { 
    // Синхронные редюсеры
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // Обновляем номер текущей страницы
    },
    setPostsPerPage: (state, action) => {
      state.postsPerPage = action.payload; // Обновляем количество постов на странице
      state.currentPage = 1; // Сбрасываем текущую страницу на 1
      saveToLocalStorage("postsPerPage", action.payload); // Сохраняем новое количество постов на страницу в localStorage
    },
    updateCurrentPagePosts: (state) => {
      // Обновляем массив постов для текущей страницы
      const indexOfLastPost = state.currentPage * state.postsPerPage; // Индекс последнего поста на странице
      const indexOfFirstPost = indexOfLastPost - state.postsPerPage; // Индекс первого поста на странице
      state.posts = state.allPosts.slice(indexOfFirstPost, indexOfLastPost); // Получаем нужные посты из массива всех постов
    },
  },
  extraReducers: (builder) => { 
    // Обработка асинхронных экшенов (thunk)
    builder
      .addCase(fetchAllPosts.pending, (state) => { // Обработка состояния "загрузка"
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => { // Обработка успешного завершения
        state.loading = false;
        state.allPosts = action.payload; // Сохраняем все полученные посты
        saveToLocalStorage("allPosts", action.payload); // Сохраняем все посты в localStorage
        state.posts = state.allPosts.slice(0, state.postsPerPage); // Обновляем посты для текущей страницы
      })
      .addCase(fetchAllPosts.rejected, (state, action) => { // Обработка ошибки
        state.loading = false;
        state.error = action.error.message || "Unknown error occurred."; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспортируем синхронные экшены
export const { 
  setCurrentPage, 
  setPostsPerPage, 
  updateCurrentPagePosts,
} = postsSlice.actions;

// Экспортируем редюсер
export default postsSlice.reducer; 
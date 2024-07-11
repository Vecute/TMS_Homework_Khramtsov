import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";
import { fetchPosts } from "../thunk/fetchPosts";

// Определяем интерфейс для состояния редюсера постов
interface PostsState {
  posts: PostProps[]; // Массив постов
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если она возникла
}

// Определяем начальное состояние редюсера
const initialState: PostsState = {
  posts: [], // Изначально постов нет
  loading: false, // Загрузка не активна
  error: null, // Ошибок нет
};

// Функция для получения постов из localStorage
const getPostsFromLocalStorage = (): PostProps[] => {
  const storedPosts = localStorage.getItem("posts"); // Получаем строку из localStorage по ключу "posts"
  // Если посты найдены в localStorage, парсим их из JSON, иначе возвращаем пустой массив
  return storedPosts ? JSON.parse(storedPosts) : [];
};

// Функция для сохранения постов в localStorage
const savePostsToLocalStorage = (posts: PostProps[]) => {
  // Сохраняем посты в localStorage, сериализуя их в JSON
  localStorage.setItem("posts", JSON.stringify(posts));
};

// Создаем редюсер postsSlice
const postsSlice = createSlice({
  name: "posts",
  // Начальное состояние, объединяем initialState с постами из localStorage, если они есть
  initialState: {
    ...initialState,
    posts: getPostsFromLocalStorage(), 
  },
  reducers: {}, // Пустой объект reducers, т.к. мы используем extraReducers для обработки асинхронных действий
  // Обработка асинхронных действий с помощью extraReducers
  extraReducers: (builder) => {
    builder
      // Обработка состояния pending для fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true; // Устанавливаем флаг загрузки в true
        state.error = null; // Сбрасываем сообщение об ошибке
      })
      // Обработка состояния fulfilled для fetchPosts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false; // Сбрасываем флаг загрузки
        state.posts = action.payload; // Обновляем посты данными из payload
        savePostsToLocalStorage(action.payload); // Сохраняем полученные посты в localStorage
      })
      // Обработка состояния rejected (ошибка) для fetchPosts
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false; // Сбрасываем флаг загрузки
        // Устанавливаем сообщение об ошибке, используя action.error.message или дефолтное сообщение
        state.error = action.error.message || "Unknown error occurred."; 
      });
  },
});

export default postsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";
import { fetchMyPosts } from "../thunk/fetchMyPosts";

// Определяем интерфейс для состояния редюсера постов авторизованного пользователя
interface MyPostsState {
  myPosts: PostProps[]; // Массив постов
  loading: boolean; // Флаг загрузки
  error: string | null; // Сообщение об ошибке, если она возникла
}

// Определяем начальное состояние редюсера
const initialState: MyPostsState = {
  myPosts: [], // Изначально постов нет
  loading: false, // Загрузка не активна
  error: null, // Ошибок нет
};

// Функция для получения постов из localStorage
const getMyPostsFromLocalStorage = (): PostProps[] => {
  const storedMyPosts = localStorage.getItem("myPosts"); // Получаем строку из localStorage по ключу "my-posts"
  // Если посты найдены в localStorage, парсим их из JSON, иначе возвращаем пустой массив
  return storedMyPosts ? JSON.parse(storedMyPosts) : [];
};

// Функция для сохранения постов авторизованного пользователя в localStorage
export const saveMyPostsToLocalStorage = (myPosts: PostProps[]) => {
  // Сохраняем посты в localStorage, сериализуя их в JSON
  localStorage.setItem("myPosts", JSON.stringify(myPosts));
};

// Функция для удаления постов авторизованного пользователя из localStorage
export const deleteMyPostsToLocalStorage = () => {
  localStorage.removeItem("myPosts");
};

// Создаем редюсер postsSlice
export const myPostsSlice = createSlice({
  name: "myPosts",
  // Начальное состояние, объединяем initialState с постами из localStorage, если они есть
  initialState: {
    ...initialState,
    myPosts: getMyPostsFromLocalStorage(), 
  },
  reducers: {
    setMyPosts: (state, action) => { // Редьюсер для установки нового массива постов
      state.myPosts = action.payload; 
    },
    removePost: (state, action) => { // Редьюсер для удаления поста по ID
      state.myPosts = state.myPosts.filter(post => post.id !== action.payload);
    },
  },
  // Обработка асинхронных действий с помощью extraReducers
  extraReducers: (builder) => {
    builder
      // Обработка состояния pending для fetchMyPosts
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true; // Устанавливаем флаг загрузки в true
        state.error = null; // Сбрасываем сообщение об ошибке
      })
      // Обработка состояния fulfilled для fetchMyPosts
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false; // Сбрасываем флаг загрузки
        state.myPosts = action.payload; // Обновляем посты данными из payload
        saveMyPostsToLocalStorage(action.payload); // Сохраняем полученные посты в localStorage
      })
      // Обработка состояния rejected (ошибка) для fetchMyPosts
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false; // Сбрасываем флаг загрузки
        // Устанавливаем сообщение об ошибке, используя action.error.message или дефолтное сообщение
        state.error = action.error.message || "Unknown error occurred."; 
      });
  },
});

export default myPostsSlice.reducer;
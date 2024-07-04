import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";

// Создаем объект POST_SIZES для хранения констант размеров поста
const POST_SIZES = {
  SMALL: "small", // Маленький размер
  MEDIUM: "medium", // Средний размер
  LARGE: "large", // Большой размер
} as const; // Утверждаем, что значения объекта POST_SIZES неизменны

// Создаем асинхронный thunk с помощью createAsyncThunk
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts", // Указываем тип действия для thunk
  async (_, { rejectWithValue }) => { // Асинхронная функция thunk
    try {
      const response = await fetch("https://jsonplaceholder.org/posts"); // Отправляем GET-запрос на API для получения постов
      const data: PostProps[] = await response.json(); // Парсим ответ от API в JSON-формат и приводим его к типу PostProps[]

      // Создаем новый массив postsWithSize, добавляя свойство size к каждому посту
      const postsWithSize = data.map((post) => ({
        ...post, // Копируем все свойства поста
        size: // Добавляем свойство size
          post.id % 5 === 0 // Если id поста делится на 5 без остатка
            ? POST_SIZES.LARGE // то размер - LARGE
            : post.id % 2 === 0 // Иначе, если id поста делится на 2 без остатка
            ? POST_SIZES.MEDIUM // то размер - MEDIUM
            : POST_SIZES.SMALL, // Иначе размер - SMALL
      }));

      return postsWithSize; // Возвращаем массив постов с добавленным свойством size
    } catch (error) { // Ловим ошибку, если таковая возникла
      if (error instanceof Error) { // Проверяем, является ли ошибка экземпляром Error
        return rejectWithValue(error.message); // Если да, то отклоняем промис с сообщением об ошибке
      } else { // Иначе
        return rejectWithValue("Unknown error occurred."); // Отклоняем промис с сообщением о неизвестной ошибке
      }
    }
  }
);
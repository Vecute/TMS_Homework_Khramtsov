import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";
import { useHttp } from "../services/authToken";

// Создаем асинхронный thunk с помощью createAsyncThunk
export const fetchMyPosts = createAsyncThunk(
  "myPosts/fetchMyPosts", // Указываем тип действия для thunk
  async (_, { rejectWithValue }) => {
    // Асинхронная функция thunk
    try {
      const http = useHttp(); // Получаем хук для выполнения HTTP-запросов
      const response = await http(
        "https://studapi.teachmeskills.by/blog/posts/my_posts/?limit=1000"
      ); // Отправляем GET-запрос на API для получения постов

      const data = await response.json(); // Парсим ответ от API в JSON-формат
      const results: PostProps[] = data["results"]; // Забираем посты и приводим их к типу PostProps[]
      return results;
    } catch (error) {
      // Ловим ошибку, если таковая возникла
      if (error instanceof Error) {
        // Проверяем, является ли ошибка экземпляром Error
        return rejectWithValue(error.message); // Если да, то отклоняем промис с сообщением об ошибке
      } else {
        // Иначе
        return rejectWithValue("Unknown error occurred."); // Отклоняем промис с сообщением о неизвестной ошибке
      }
    }
  }
);

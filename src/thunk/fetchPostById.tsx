import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostProps } from "../components/PostCard";

// Создаем асинхронный thunk для получения поста по ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById", // Название экшена
  async (postId: number, { rejectWithValue }) => { // Функция, которая выполняется асинхронно, принимает ID поста и объект thunkAPI
    try {
      // Пытаемся выполнить запрос к API
      const response = await fetch(
        `https://studapi.teachmeskills.by/blog/posts/${postId}/` // URL для получения поста по ID
      );

      // Проверяем, успешен ли запрос (статус код 2xx)
      if (!response.ok) {
        // Если запрос не успешен, бросаем ошибку
        throw new Error('Network response was not ok');
      }

      // Если запрос успешен, парсим JSON из ответа
      const results: PostProps = await response.json();

      // Возвращаем данные поста
      return results;

    } catch (error) { // Ловим ошибку, если она произошла
      // Если ошибка - это экземпляр класса Error, возвращаем сообщение об ошибке
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else { // Иначе, возвращаем сообщение о неизвестной ошибке
        return rejectWithValue("Unknown error occurred.");
      }
    }
  }
);
// Константы для ключей access_token и refresh_token в localStorage
const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Функции для получения access_token и refresh_token из localStorage
const getAccessToken = () => localStorage.getItem(TOKEN_KEY);
const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// Функции для установки access_token и refresh_token в localStorage
const setAccessToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token);
const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token);

// Функция для удаления обоих токенов из localStorage
const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Асинхронная функция для обновления access_token
const refreshToken = async () => {
  // Получаем refresh_token из localStorage
  const refreshToken = getRefreshToken();
  // Если refresh_token не найден, возвращаем null
  if (!refreshToken) return null;

  try {
    // Отправляем запрос на сервер для обновления access_token
    const response = await fetch(
      "https://studapi.teachmeskills.by/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );

    // Если запрос не успешен, выбрасываем ошибку
    if (!response.ok) {
      throw new Error("Refresh token is invalid");
    }

    // Получаем данные ответа в формате JSON
    const data = await response.json();
    // Устанавливаем новый access_token в localStorage
    setAccessToken(data.access);
    // Возвращаем новый access_token
    return data.access;
  } catch (error) {
    // Логируем ошибку обновления токена
    console.error("Error refreshing token:", error);
    // Очищаем localStorage от токенов
    clearTokens();
    // Возвращаем null
    return null;
  }
};

// Функция-хук для выполнения HTTP-запросов
const useHttp = () => {
  // Асинхронная функция для выполнения запроса
  const makeRequest = async (url: string, options: RequestInit = {}) => {
    // Получаем access_token из localStorage
    const accessToken = getAccessToken();
    // Создаем заголовки запроса, добавляя Authorization с access_token
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
    // Создаем новые опции запроса с обновленными заголовками
    const newOptions = {
      ...options,
      headers,
    };
    try {
      // Выполняем запрос
      const response = await fetch(url, newOptions);

      // Если запрос не успешен
      if (!response.ok) {
        // Если статус ответа 401 (Unauthorized)
        if (response.status === 401) {
          // Обновляем access_token
          const newAccessToken = await refreshToken();
          // Если обновление успешно
          if (newAccessToken) {
             // Устанавливаем новый access_token
            setAccessToken(newAccessToken);
            // Повторяем запрос с новым access_token
            return await fetch(url, {
              ...newOptions,
              headers: {
                ...newOptions.headers,
                Authorization: `Bearer ${newAccessToken}`, // Обновляем заголовок Authorization
              },
            });
          } else {
            // Если обновление не удалось, выбрасываем ошибку
            throw new Error("Failed to refresh token");
          }
        } else {
          // Если статус ответа не 401, выбрасываем ошибку
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      return response; // Возвращаем ответ

    } catch (error) {
      console.error("Error fetching data:", error); // Логируем ошибку
      throw error; // Перебрасываем ошибку дальше
    }
  };

  return makeRequest; // Возвращаем функцию makeRequest
};

export { getAccessToken, setRefreshToken, setAccessToken, clearTokens, useHttp };

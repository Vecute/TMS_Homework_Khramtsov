import { useEffect, useState } from 'react';
import { getAccessToken, useHttp } from '../services/authToken';

const useTokenChecker = () => { // Определяем кастомный хук useTokenChecker
  const [isValid, setIsValid] = useState(false); // Создаем state isValid с начальным значением false. Он будет хранить информацию о том, является ли токен валидным
  const makeRequest = useHttp(); // Вызываем useHttp() и сохраняем результат в переменной makeRequest

  useEffect(() => {
    const accessToken = getAccessToken(); // Получаем токен из localStorage
    const checkToken = async () => { // Определяем асинхронную функцию checkToken для проверки токена
      try { // Используем try-catch для обработки ошибок
        await makeRequest('https://studapi.teachmeskills.by/auth/jwt/verify/', { // Выполняем POST-запрос на URL для проверки токена
            method: 'POST', // Метод запроса - POST
            headers: { // Заголовки запроса
                'Content-Type': 'application/json', // Тип контента - JSON
                Authorization: `Bearer ${accessToken}`, // Токен в заголовке Authorization
              },
            body: JSON.stringify({ token: accessToken }) // Тело запроса - JSON-объект с токеном
        });
        setIsValid(true); // Если запрос успешен, устанавливаем isValid в true
      } catch (error) { // Если запрос завершился ошибкой
        setIsValid(false); // Устанавливаем isValid в false
        console.error('Error checking token:', error); // Выводим ошибку в консоль
      }
    };

    checkToken(); // Вызываем функцию checkToken() для проверки токена
  }, [makeRequest]); // useEffect будет выполняться каждый раз, когда makeRequest изменится

  return isValid; // Возвращаем значение isValid
}

export default useTokenChecker
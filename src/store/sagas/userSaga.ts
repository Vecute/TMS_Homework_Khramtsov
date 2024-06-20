import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } from '../slices/userSlice';
import { User } from '../slices/userSlice';

// Определяем генератор-сагу fetchUsersSaga, которая будет загружать пользователей
function* fetchUsersSaga() {
  try {
    // Вызываем fetch для получения данных по указанному URL, используя call для работы с побочным эффектом
    const response: Response = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
    // Преобразуем ответ сервера в JSON, используя call для вызова метода json() объекта Response
    const data: User[] = yield call([response, 'json']);

    // Отправляем экшен fetchUsersSuccess с загруженными данными в хранилище Redux
    yield put(fetchUsersSuccess(data));
  } catch (error) {
    // В случае ошибки отправляем экшен fetchUsersFailure с сообщением об ошибке
    yield put(fetchUsersFailure('Error loading users'));
  }
}

// Определяем watcher-сагу watchFetchUsers, которая будет следить за экшеном fetchUsersStart
export function* watchFetchUsers() {
  // Используем takeLatest для запуска fetchUsersSaga только один раз при каждом вызове fetchUsersStart, игнорируя предыдущие запросы
  yield takeLatest(fetchUsersStart.type, fetchUsersSaga);
}
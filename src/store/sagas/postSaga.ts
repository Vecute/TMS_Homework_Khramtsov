import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } from '../slices/postSlice';
import { Post } from '../slices/postSlice';

// Определяем генератор-сагу fetchPostsSaga, которая будет загружать посты
function* fetchPostsSaga() {
  try {
    // Вызываем fetch для получения данных по указанному URL, используя call для работы с побочным эффектом
    const response: Response = yield call(fetch, 'https://jsonplaceholder.typicode.com/posts');
    // Преобразуем ответ сервера в JSON, используя call для вызова метода json() объекта Response
    const data: Post[] = yield call([response, 'json']); 

    // Отправляем экшен fetchPostsSuccess с загруженными данными в хранилище Redux
    yield put(fetchPostsSuccess(data)); 
  } catch (error) {
    // В случае ошибки, отправляем экшен fetchPostsFailure с сообщением об ошибке
    yield put(fetchPostsFailure('Error loading posts'));
  }
}

// Определяем watcher-сагу watchFetchPosts, которая будет следить за экшеном fetchPostsStart
export function* watchFetchPosts() {
  // Используем takeLatest для запуска fetchPostsSaga только один раз при каждом вызове fetchPostsStart, игнорируя предыдущие запросы
  yield takeLatest(fetchPostsStart.type, fetchPostsSaga);
}
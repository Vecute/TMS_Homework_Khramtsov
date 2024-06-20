import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure } from '../slices/todoSlice';
import { Todo } from '../slices/todoSlice'; 

// Определяем генератор-сагу fetchTodosSaga, которая будет загружать задачи
function* fetchTodosSaga() {
  try {
    // Вызываем fetch для получения данных по указанному URL, используя call для работы с побочным эффектом
    const response: Response = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos');
    // Преобразуем ответ сервера в JSON, используя call для вызова метода json() объекта Response
    const data: Todo[] = yield call([response, 'json']);

    // Отправляем экшен fetchTodosSuccess с загруженными данными в хранилище Redux
    yield put(fetchTodosSuccess(data)); 
  } catch (error) {
    // В случае ошибки, отправляем экшен fetchTodosFailure с сообщением об ошибке
    yield put(fetchTodosFailure('Error loading tasks'));
  }
}

// Определяем watcher-сагу watchFetchTodos, которая будет следить за экшеном fetchTodosStart
export function* watchFetchTodos() {
  // Используем takeLatest для запуска fetchTodosSaga только один раз при каждом вызове fetchTodosStart, игнорируя предыдущие запросы
  yield takeLatest(fetchTodosStart.type, fetchTodosSaga);
}
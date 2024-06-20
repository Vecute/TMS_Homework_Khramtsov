import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todoReducer from './slices/todoSlice'; 
import userReducer from './slices/userSlice'; 
import postReducer from './slices/postSlice';
import searchReducer from './slices/searchSlice'; 
import { watchFetchTodos } from './sagas/todoSaga';
import { watchFetchUsers } from './sagas/userSaga';
import { watchFetchPosts } from './sagas/postSaga';

// Создаем экземпляр saga middleware
const sagaMiddleware = createSagaMiddleware();

// Комбинируем все редьюсеры в один корневой редьюсер
const rootReducer = combineReducers({
  todos: todoReducer, // Состояние задач
  users: userReducer, // Состояние пользователей
  posts: postReducer, // Состояние постов
  search: searchReducer, // Состояние поиска
});

// Создаем хранилище Redux, передавая корневой редьюсер и middleware
const store = configureStore({
  reducer: rootReducer,
  // Добавляем saga middleware в цепочку middleware хранилища
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Запускаем watcher-саги, чтобы они начали следить за действиями
sagaMiddleware.run(watchFetchTodos);
sagaMiddleware.run(watchFetchUsers);
sagaMiddleware.run(watchFetchPosts);

// Определяем тип для корневого состояния приложения
export type RootState = ReturnType<typeof rootReducer>; 
export default store;
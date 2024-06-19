import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postPopUpReducer from "./postPopUpReducer";
import themeReducer from "./themeReducer";
import imagePopUpReducer from "./imagePopUpReducer";
import likesDislikesReducer from "./likesDislikesReducer";
import likeStatesReducer from "./likeStatesReducer";
import favoritesReducer from "./favoritesReducer";
import postsReducer from "./postsReducer";
import userMailConfirmationReducer from "./userMailConfirmationReducer";
import { useDispatch } from "react-redux";
import { thunk } from "redux-thunk";

// Создание главного редюсера путем объединения редюсеров с помощью функции combineReducers
const combineReducer = combineReducers({
        postPopUpReducer,            // Редюсер для всплывающего окна с постом
        themeReducer,                // Редюсер для темы
        imagePopUpReducer,           // Редюсер для всплывающего окна с картинкой
        likesDislikesReducer,        // Редюсер для количества лайков/дизлайков
        likeStatesReducer,           // Редюсер для состояния лайков/дизлайков
        favoritesReducer,            // Редюсер для избранного
        postsReducer,                // Редюсер для постов
        userMailConfirmationReducer, // Редюсер для подтверждения почты
    }
)

// Определение типа RootState, который представляет глобальное состояние приложения
export type RootState = ReturnType<typeof combineReducer>;

// Создаем тип AppDispatch, который описывает тип функции dispatch для нашего хранилища
export type AppDispatch = typeof store.dispatch;

// Создание хранилища Redux с помощью функции configureStore и передача главного редюсера в качестве редюсера
export const store = configureStore({
        reducer: combineReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    }
)

// Создаем типизированный хук useAppDispatch для использования dispatch с типами в компонентах
export const useAppDispatch = () => useDispatch<AppDispatch>(); 
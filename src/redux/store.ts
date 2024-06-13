import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postPopUpReducer from "./postPopUpReducer";
import themeReducer from "./themeReducer";
import imagePopUpReducer from "./imagePopUpReducer";
import likesDislikesReducer from "./likesDislikesReducer";
import likeStatesReducer from "./likeStatesReducer";
import favoritesReducer from "./favoritesReducer";
import postsReducer from "./postsReducer";

// Создание главного редюсера путем объединения редюсеров с помощью функции combineReducers
const combineReducer = combineReducers({
        postPopUpReducer,         // Редюсер для всплывающего окна с постом
        themeReducer,             // Редюсер для темы
        imagePopUpReducer,        // Редюсер для всплывающего окна с картинкой
        likesDislikesReducer,     // Редюсер для количества лайков/дизлайков
        likeStatesReducer,        // Редюсер для состояния лайков/дизлайков
        favoritesReducer,         // Редюсер для избранного
        postsReducer,             // Редюсер для постов
    }
)

// Определение типа RootState, который представляет глобальное состояние приложения
export type RootState = ReturnType<typeof combineReducer>;

// Создание хранилища Redux с помощью функции configureStore и передача главного редюсера в качестве редюсера
export const store = configureStore({
        reducer: combineReducer
    }
)
import { createSlice } from "@reduxjs/toolkit";
import {PostType} from "../components/PostCard";

// Определение типа для начального состояния редюсера
type InitialStateType = {
    selectedPost: PostType | null
}
// Определение начального состояния редюсера
const initialState: InitialStateType = {
    selectedPost: null
}

// Создание редюсера с помощью функции createSlice
const postPopUpReducer = createSlice(
    {
        // Имя редюсера
        name: 'postPopUp',
        // Начальное состояние редюсера
        initialState,
        // Определение действий (actions) и обработчиков действий (reducers)
        reducers: {
            // Действие для установки выбранного поста
            setSelectedPost: (state, action) => {
                // Установка выбранного поста в состояние редюсера
                state.selectedPost = action.payload
            }
        }
    }
)

// Экспорт действия и редюсера
export const {setSelectedPost} = postPopUpReducer.actions
export default postPopUpReducer.reducer
import { createSlice } from "@reduxjs/toolkit";

// Определение типа для начального состояния редюсера
type InitialStateType = {
    userEmail: string | null
}
// Определение начального состояния редюсера
const initialState: InitialStateType = {
    userEmail: null
}

// Создание редюсера с помощью функции createSlice
const userMailConfirmationReducer = createSlice(
    {
        // Имя редюсера
        name: 'userMailConfirmation',
        // Начальное состояние редюсера
        initialState,
        // Определение действий (actions) и обработчиков действий (reducers)
        reducers: {
            // Действие для установки выбранного поста
            setUserMailConfirmation: (state, action) => {
                // Установка выбранного поста в состояние редюсера
                state.userEmail = action.payload
            }
        }
    }
)

// Экспорт действия и редюсера
export const {setUserMailConfirmation} = userMailConfirmationReducer.actions
export default userMailConfirmationReducer.reducer
import { createSlice } from "@reduxjs/toolkit";

// Тип для начального состояния
type InitialStateType = {
  selectedImage: string | null;
};

// Начальное состояние
const initialState: InitialStateType = {
  selectedImage: null,
};

// Создание редюсера
const imagePopUpReducer = createSlice({
  name: "imagePopUp",
  initialState,
  reducers: {
    // Действие для установки выбранного изображения
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
});

// Экспорт действия и редюсера
export const { setSelectedImage } = imagePopUpReducer.actions;
export default imagePopUpReducer.reducer;
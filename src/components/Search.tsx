import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../store/slices/searchSlice";
import { TextField } from "@mui/material";

const Search: React.FC = () => {
  // Получаем функцию dispatch для отправки экшенов
  const dispatch = useDispatch();
  // Создаем локальное состояние для хранения поискового запроса
  const [query, setQuery] = useState("");

  // Обработчик события изменения значения input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Обновляем локальное состояние с новым значением input
    setQuery(e.target.value);
    // Отправляем экшен setSearchQuery с новым значением input в хранилище Redux
    dispatch(setSearchQuery(e.target.value));
  };

  return (
      <TextField
        // variant="standard"
        type="text" // Тип input - текст
        value={query} // Привязываем значение input к локальному состоянию
        onChange={handleChange} // Назначаем обработчик события изменения значения input
        label="Search"
        size="small"
      />
  );
};

export default Search;

import { useState, useRef } from "react";

// Этот кастомный хук useInput управляет состоянием и валидацией поля ввода, а также предоставляет ссылку на сам элемент поля ввода
const useInput = (initialValue: string) => {
  // Используем хук useState для управления значением поля ввода
  const [value, setValue] = useState(initialValue);
  // Используем хук useState для управления валидностью поля ввода
  const [isValid, setIsValid] = useState(true);
  // Используем хук useRef для создания ссылки на элемент поля ввода
  const ref = useRef<HTMLInputElement>(null);

  // Определяем функцию обработчика изменения значения поля ввода
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Обновляем значение поля ввода
    setValue(e.target.value);
  };

  // Возвращаем объект с данными и методами для управления полем ввода
  return { value, isValid, setIsValid, onChange, ref };
};

export default useInput;
// Модуль с функциями для работы с localStorage

// Функция для получения данных из localStorage
export function getDate() { // Сразу экспортируем функцию
    return JSON.parse(localStorage.getItem('todos')); // Получаем данные из localStorage с ключом 'todos' и преобразуем их из формата JSON в JavaScript-объект
}

// Функция для сохранения данных в localStorage
export function setDate(data) { // Сразу экспортируем функцию
    localStorage.setItem('todos', JSON.stringify(data)); // Сохраняем данные в localStorage с ключом 'todos', предварительно преобразовав их в формат JSON
}
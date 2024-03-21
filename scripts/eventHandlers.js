// Модуль с функцией добавления слушателей к объекту window

// Импортируем сторонние модули
import {loadTodos} from './loadTodos.js';

//  Функция, которая добавляет слушатели событий к объекту window
export function addWindowEventListeners() {
    window.addEventListener("load", function(){ // Добавляем обработчик события загрузки страницы, который вызывает функцию loadTodos
        loadTodos();
    });
    window.addEventListener("storage", function(){ // Добавляем обработчик события на все изменения, для отображения изменений в другой вкладке , который вызывает функцию loadTodos
        loadTodos();
    });
}
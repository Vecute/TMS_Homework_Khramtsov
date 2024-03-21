// Модуль с функциями загрузки и обновления списка задач

// Импортируем сторонние модули
import { getDate, setDate } from './localStorage.js'; 

// Функция для загрузки задач из localStorage и отображения их на странице
export function loadTodos() { // Сразу экспортируем функцию
    const todos = getDate(); // Получаем текущий список задач из localStorage
    todoList.innerHTML = ''; // Очистить список задач перед добавлением новых
    todos.forEach(({ id, text, date, isChecked }) => { // Для каждой задачи в списке (тут сразу применяем деструктуризацию, чтобы быстрее обращаться ко всем элементам объекта)
        const li = document.createElement('li'); // Создаем новый элемент списка
        li.className = 'todo-item'; // Устанавливаем класс элемента списка
        li.dataset.id = id; // Сохраняем идентификатор задачи в атрибуте data-id элемента списка
        if (isChecked) { // Если задача выполнена
            li.classList.add('checked'); // Добавляем класс 'checked' к элементу списка
        }

        const checkbox = document.createElement('input'); // Создаем чекбокс
        checkbox.type = 'checkbox'; // Устанавливаем тип чекбокса
        checkbox.checked = isChecked; // Устанавливаем состояние чекбокса в соответствии с состоянием задачи
        checkbox.addEventListener('change', () => { // Добавляем обработчик события изменения чекбокса
            todoContent.classList.toggle('completed'); // Переключаем класс 'completed' у содержимого задачи
            li.classList.toggle('checked'); // Переключаем класс 'checked' у элемента списка
            const todos = getDate(); // Получаем текущий список задач из localStorage
            const todo = todos.find(t => t.id === Number(li.dataset.id)); // Находим задачу, которая соответствует id элемента списка
            if (todo) {
                todo.isChecked = checkbox.checked; // Обновляем состояние 'isChecked' задачи в соответствии со состоянием чекбокса
            }
            setDate(todos); // Сохраняем обновленный список задач в localStorage
            updateCounts(); // Обновляем счетчики задач
        });
        li.appendChild(checkbox); // Добавляем чекбокс в элемент списка

        const todoContent = document.createElement('div'); // Создаем контейнер для содержимого задачи
        todoContent.className = 'todo-content'; // Устанавливаем класс контейнера
        if (isChecked) { // Если задача выполнена
            todoContent.classList.add('completed'); // Добавляем класс 'completed' к контейнеру
        }

        const textNode = document.createTextNode(text); // Создаем текстовый узел с текстом задачи
        todoContent.appendChild(textNode); // Добавляем текстовый узел в контейнер

        const dateTimeSpan = document.createElement('span'); // Создаем элемент span для даты и времени
        dateTimeSpan.textContent = date; // Устанавливаем текст элемента span в дату и время задачи
        dateTimeSpan.className = 'date-time'; // Устанавливаем класс элемента span
        todoContent.appendChild(dateTimeSpan); // Добавляем элемент span в контейнер

        li.appendChild(todoContent); // Добавляем контейнер в элемент списка

        const deleteBtn = document.createElement('button'); // Создаем кнопку удаления
        deleteBtn.textContent = 'X'; // Устанавливаем текст кнопки
        deleteBtn.className = 'delete-btn'; // Устанавливаем класс кнопки
        deleteBtn.addEventListener('click', () => { // Добавляем обработчик события клика на кнопку удаления
            li.remove(); // Удаляем элемент списка (li), который соответствует текущей задаче
            const todos = getDate(); // Получаем текущий список задач из localStorage
            const index = todos.findIndex(t => t.id === Number(li.dataset.id)); // Находим индекс текущей задачи в массиве todos
            if (index !== -1) { // Если задача найдена в массиве todos (findIndex отдаёт -1, если элемента нету), удаляем ее из массива
                todos.splice(index, 1);
            }
            setDate(todos); // Обновляем список задач в localStorage
            updateCounts(); // Обновляем счетчики задач
        });
        li.appendChild(deleteBtn); // Добавляем кнопку удаления в элемент списка

        todoList.appendChild(li); // Добавляем элемент списка в список задач на странице
    });
    updateCounts(); // Обновляем счетчики задач
}

// Функция обновления счетчиков
export function updateCounts() { // Сразу экспортируем функцию
    const allTodos = todoList.children.length; // Получаем количество всех задач
    const completedTodos = todoList.querySelectorAll('.completed').length; // Получаем количество завершенных задач
    allCount.textContent = 'All: ' + allTodos; // Обновляем текст счетчика всех задач
    completedCount.textContent = 'Completed: ' + completedTodos; // Обновляем текст счетчика завершенных задач
}
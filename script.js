"use strict" // Строгий режим JavaScript, чтобы предотвратить некоторые ошибки.

// Получаем элементы DOM
const todoInput = document.getElementById('todoInput'); // Поле ввода задачи
const todoList = document.getElementById('todoList'); // Список задач
const addTodo = document.getElementById('addTodo'); // Кнопка добавления задачи
const deleteAll = document.getElementById('deleteAll'); // Кнопка удаления всех задач
const deleteLast = document.getElementById('deleteLast'); // Кнопка удаления последней задачи
const allCount = document.getElementById('allCount'); // Счетчик всех задач
const completedCount = document.getElementById('completedCount'); // Счетчик завершенных задач
const showAll = document.getElementById('showAll'); // Кнопка показа всех задач
const showCompleted = document.getElementById('showCompleted'); // Кнопка показа завершенных задач
const searchInput = document.getElementById('searchInput'); // Поле ввода поиска

// Проверяем, есть ли в localStorage элемент с ключом 'todos'
if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([])); // Если его нет, то создаем его с пустым массивом в качестве значения
}

// Функция для получения данных из localStorage
function getDate() {
    return JSON.parse(localStorage.getItem('todos')); // Получаем данные из localStorage с ключом 'todos' и преобразуем их из формата JSON в JavaScript-объект
}

// Функция для сохранения данных в localStorage
function setDate(data) {
    localStorage.setItem('todos', JSON.stringify(data)); // Сохраняем данные в localStorage с ключом 'todos', предварительно преобразовав их в формат JSON
}

// Обработчик события нажатия на кнопку добавления задачи
addTodo.addEventListener('click', () => {
    const value = todoInput.value; // Получаем значение из поля ввода
    if (!value.trim()) { // Если значение пустое или состоит только из пробелов
        return; // Прекращаем выполнение функции
    }
    const li = document.createElement('li'); // Создаем новый элемент списка
    li.className = 'todo-item'; // Присваиваем ему класс 'todo-item'

    const checkbox = document.createElement('input'); // Создаем чекбокс
    checkbox.type = 'checkbox'; // Устанавливаем тип элемента как чекбокс
    checkbox.addEventListener('change', () => { // Добавляем обработчик события изменения чекбокса
        todoContent.classList.toggle('completed'); // Переключаем класс 'completed' у содержимого задачи
        li.classList.toggle('checked'); // Переключаем класс 'checked' у элемента списка
        const todos = getDate(); // Получаем текущий список задач из localStorage
        const todo = todos.find(t => t.id === Number(li.dataset.id)); // Находим задачу, которая соответствует id элемента списка
        if (todo) {
            todo.isChecked = checkbox.checked; // Обновляем состояние 'isChecked' задачи в соответствии со состоянием чекбокса
        }
        setDate(todos); // Сохраняем обновленный список задач в localStorage
        updateCounts(); // Обновляем счетчики
    });
    li.appendChild(checkbox); // Добавляем чекбокс в элемент списка

    const todoContent = document.createElement('div'); // Создаем div для содержимого задачи
    todoContent.className = 'todo-content'; // Присваиваем ему класс 'todo-content'

    const text = document.createTextNode(value); // Создаем текстовый узел с текстом задачи
    todoContent.appendChild(text); // Добавляем текст в div содержимого задачи

    const date = new Date(); // Получаем текущую дату и время
    const dateString = date.toLocaleDateString(); // Преобразуем дату в строку
    const timeString = date.toLocaleTimeString(); // Преобразуем время в строку
    const dateTimeSpan = document.createElement('span'); // Создаем span для даты и времени
    dateTimeSpan.textContent = `${dateString} ${timeString}`; // Устанавливаем текст span как строку даты и времени
    dateTimeSpan.className = 'date-time'; // Присваиваем span класс 'date-time'
    todoContent.appendChild(dateTimeSpan); // Добавляем span с датой и временем в div содержимого задачи

    li.appendChild(todoContent); // Добавляем div содержимого задачи в элемент списка

    const deleteBtn = document.createElement('button'); // Создаем кнопку удаления
    deleteBtn.textContent = 'X'; // Устанавливаем текст кнопки как 'X'
    deleteBtn.className = 'delete-btn'; // Присваиваем кнопке класс 'delete-btn'
    deleteBtn.addEventListener('click', () => { // Добавляем обработчик события нажатия на кнопку
        li.remove(); // Удаляем элемент списка
        updateCounts(); // Обновляем счетчики
    });
    li.appendChild(deleteBtn); // Добавляем кнопку удаления в элемент списка

    todoList.appendChild(li); // Добавляем элемент списка в список задач
    todoInput.value = ''; // Очищаем поле ввода
    updateCounts(); // Обновляем счетчики

    const id = Date.now(); // Генерируем уникальный идентификатор для задачи, используя текущее время в миллисекундах
    li.dataset.id = id; // Сохраняем этот идентификатор в атрибуте data-id элемента списка 

    const todos = getDate(); // Получаем текущий список задач из localStorage
    todos.push({ // Добавляем новую задачу в список
        id: id, // Устанавливаем идентификатор задачи
        date: `${dateString} ${timeString}`, // Устанавливаем дату и время создания задачи
        text: value, // Устанавливаем текст задачи
        isChecked: false, // Устанавливаем состояние задачи как 'не выполнено'
    });
    setDate(todos); // Сохраняем обновленный список задач в localStorage
});

// Обработчик события нажатия на кнопку 'Enter' в поле ввода задачи
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвращаем действие по умолчанию
        addTodo.click(); // Имитируем нажатие кнопки 'addTodo'
    }
});

// Обработчик события нажатия на кнопку удаления всех задач
deleteAll.addEventListener('click', () => {
    while (todoList.firstChild) { // Пока в списке есть элементы
        todoList.removeChild(todoList.firstChild); // Удаляем первый элемент
    }
    setDate([]); // Сохраняем пустой массив в localStorage под ключом 'todos'
    updateCounts(); // Обновляем счетчики
});

// Обработчик события нажатия на кнопку удаления последней задачи
deleteLast.addEventListener('click', () => {
    if (todoList.lastChild) { // Если в списке есть последний элемент
        todoList.removeChild(todoList.lastChild); // Удаляем последний элемент
    }
    const todos = getDate(); // Получаем текущий список задач из localStorage
    todos.pop(); // Удаляем последнюю задачу из списка
    setDate(todos); // Сохраняем обновленный список задач в localStorage
    updateCounts(); // Обновляем счетчики
});

// Обработчик события нажатия на кнопку показа всех задач
showAll.addEventListener('click', () => {
    for (let item of todoList.children) { // Для каждого элемента в списке
        item.style.display = ''; // Показываем элемент
    }
});

// Обработчик события нажатия на кнопку показа завершенных задач
showCompleted.addEventListener('click', () => {
    for (let item of todoList.children) { // Для каждого элемента в списке
        if (!item.querySelector('.todo-content').classList.contains('completed')) { // Если элемент не содержит класс 'completed'
            item.style.display = 'none'; // Скрываем элемент
        }
    }
});

// Обработчик события ввода в поле поиска
searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase(); // Получаем значение из поля ввода и преобразуем его в нижний регистр
    for (let item of todoList.children) { // Для каждого элемента в списке
        const text = item.querySelector('.todo-content').textContent.toLowerCase(); // Получаем текст элемента и преобразуем его в нижний регистр
        if (text.includes(value)) { // Если текст элемента содержит значение из поля ввода
            item.style.display = ''; // Показываем элемент
        } else {
            item.style.display = 'none'; // Скрываем элемент
        }
    }
});

// Функция обновления счетчиков
function updateCounts() {
    const allTodos = todoList.children.length; // Получаем количество всех задач
    const completedTodos = todoList.querySelectorAll('.completed').length; // Получаем количество завершенных задач
    allCount.textContent = 'All: ' + allTodos; // Обновляем текст счетчика всех задач
    completedCount.textContent = 'Completed: ' + completedTodos; // Обновляем текст счетчика завершенных задач
}

// Функция для загрузки задач из localStorage и отображения их на странице
function loadTodos() {
    const todos = getDate(); // Получаем текущий список задач из localStorage
    todos.forEach(todo => { // Для каждой задачи в списке
        const li = document.createElement('li'); // Создаем новый элемент списка
        li.className = 'todo-item'; // Устанавливаем класс элемента списка
        li.dataset.id = todo.id; // Сохраняем идентификатор задачи в атрибуте data-id элемента списка
        if (todo.isChecked) { // Если задача выполнена
            li.classList.add('checked'); // Добавляем класс 'checked' к элементу списка
        }

        const checkbox = document.createElement('input'); // Создаем чекбокс
        checkbox.type = 'checkbox'; // Устанавливаем тип чекбокса
        checkbox.checked = todo.isChecked; // Устанавливаем состояние чекбокса в соответствии с состоянием задачи
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
        if (todo.isChecked) { // Если задача выполнена
            todoContent.classList.add('completed'); // Добавляем класс 'completed' к контейнеру
        }

        const text = document.createTextNode(todo.text); // Создаем текстовый узел с текстом задачи
        todoContent.appendChild(text); // Добавляем текстовый узел в контейнер

        const dateTimeSpan = document.createElement('span'); // Создаем элемент span для даты и времени
        dateTimeSpan.textContent = todo.date; // Устанавливаем текст элемента span в дату и время задачи
        dateTimeSpan.className = 'date-time'; // Устанавливаем класс элемента span
        todoContent.appendChild(dateTimeSpan); // Добавляем элемент span в контейнер

        li.appendChild(todoContent); // Добавляем контейнер в элемент списка

        const deleteBtn = document.createElement('button'); // Создаем кнопку удаления
        deleteBtn.textContent = 'X'; // Устанавливаем текст кнопки
        deleteBtn.className = 'delete-btn'; // Устанавливаем класс кнопки
        deleteBtn.addEventListener('click', () => { // Добавляем обработчик события клика на кнопку
            li.remove(); // Удаляем элемент списка
            const index = todos.indexOf(todo); // Находим индекс задачи в списке
            todos.splice(index, 1); // Удаляем задачу из списка
            setDate(todos); // Сохраняем обновленный список задач в localStorage
            updateCounts(); // Обновляем счетчики задач
        });
        li.appendChild(deleteBtn); // Добавляем кнопку удаления в элемент списка

        todoList.appendChild(li); // Добавляем элемент списка в список задач на странице
    });
    updateCounts(); // Обновляем счетчики задач
}

// Добавляем обработчик события загрузки документа, который вызывает функцию loadTodos
document.addEventListener("DOMContentLoaded", function(){
    loadTodos();
})
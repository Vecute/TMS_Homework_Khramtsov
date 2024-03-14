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
        updateCounts(); // Обновляем счетчики
    });
    li.appendChild(checkbox); // Добавляем чекбокс в элемент списка

    const todoContent = document.createElement('div'); // Создаем div для содержимого задачи
    todoContent.className = 'todo-content'; // Присваиваем ему класс 'todo-content'

    const text = document.createTextNode(value); // Создаем текстовый узел с текстом задачи
    todoContent.appendChild(text); // Добавляем текст в div содержимого задачи

    const date = new Date(); // Получаем текущую дату
    const dateString = date.toLocaleDateString('ru-RU'); // Преобразуем дату в строку
    const dateSpan = document.createElement('span'); // Создаем span для даты
    dateSpan.textContent = dateString; // Устанавливаем текст span как строку даты
    dateSpan.className = 'date'; // Присваиваем span класс 'date'
    todoContent.appendChild(dateSpan); // Добавляем span с датой в div содержимого задачи

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
    updateCounts(); // Обновляем счетчики
});

// Обработчик события нажатия на кнопку удаления последней задачи
deleteLast.addEventListener('click', () => {
    if (todoList.lastChild) { // Если в списке есть последний элемент
        todoList.removeChild(todoList.lastChild); // Удаляем последний элемент
    }
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
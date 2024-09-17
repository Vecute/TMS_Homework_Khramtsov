// Функция getTodos делает запрос по указанному адресу и забирает данные.
async function getTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    return todos;
}

// Функция printTodos создает список ul, и в каждый элемент li добавляет данные из полученного объекта с делом.
function printTodos(todos) {
    const list = document.createElement('ul');
    document.body.prepend(list);
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = `${todo.id} ${todo.title}`;
        list.appendChild(listItem);
    });
}

// Вызов функций
getTodos().then(todos => {
    printTodos(todos);
});
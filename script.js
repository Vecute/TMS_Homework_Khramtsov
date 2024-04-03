// Объявляем переменные для хранения начального времени, прошедшего времени и идентификатора таймера
let startTime = null;
let elapsedTime = 0;
let timerId = null;

// Функция для обновления таймера
function updateTimer() {
    // Получаем текущее время
    const now = Date.now();
    // Увеличиваем прошедшее время на разницу между текущим временем и начальным временем
    elapsedTime += now - startTime;
    // Обновляем начальное время
    startTime = now;
    // Обновляем текст таймера на странице
    document.getElementById('timer').textContent = (elapsedTime / 1000).toFixed(2) + ' sec';
    // Сохраняем прошедшее время в localStorage
    localStorage.setItem('elapsedTime', elapsedTime);
}

// Функция, которая выполняется при загрузке страницы
window.onload = function() {
    // Проверяем, есть ли сохраненное значение elapsedTime в localStorage
    // Если есть, то используем его, иначе устанавливаем в elapsedTime 0
    elapsedTime = localStorage.getItem('elapsedTime') ? parseInt(localStorage.getItem('elapsedTime')) : 0;
    // Обновляем текст таймера на странице
    document.getElementById('timer').textContent = (elapsedTime / 1000).toFixed(2) + ' sec';
};

// Добавляем обработчик событий для кнопки "Start"
document.getElementById('start').addEventListener('click', function() {
    // Если таймер уже запущен, то ничего не делаем
    if (timerId) return;
    // Устанавливаем начальное время
    startTime = Date.now();
    // Запускаем таймер
    timerId = setInterval(updateTimer, 10);
});

// Добавляем обработчик событий для кнопки "Pause"
document.getElementById('pause').addEventListener('click', function() {
    // Останавливаем таймер
    clearInterval(timerId);
    // Сбрасываем идентификатор таймера
    timerId = null;
});

// Добавляем обработчик событий для кнопки "Reset"
document.getElementById('reset').addEventListener('click', function() {
    // Останавливаем таймер
    clearInterval(timerId);
    // Сбрасываем идентификатор таймера и прошедшее время
    timerId = null;
    elapsedTime = 0;
    // Обновляем текст таймера на странице
    document.getElementById('timer').textContent = '0.00 sec';
    // Удаляем сохраненное значение elapsedTime из localStorage
    localStorage.removeItem('elapsedTime');
});
"use strict"
// Task 1
let person = {
    name: 'Jhon',
    age: 45,
}
delete person.name
delete person.age

// Task 2
let movie = {
    title: 'Avatar',
    productionYear: 2009,
}
let key = 'productionYear'
if (key in movie) {
    console.log(true)
    } else {
    console.log(false)
}

// Task 3
const student = {
    name: 'John',
    age: 19,
    isHappy: true
}

for (let key in student) {
    console.log(key)
    console.log(student[key])
}

// Task 4
const colors = {
    'ru pum pu ru rum': {
    red: 'красный',
    green: 'зеленый',
    blue: 'синий'
    },
}

console.log(colors['ru pum pu ru rum'].red)
console.log(colors['ru pum pu ru rum'].blue)

// Task 5
let salaries = {
    andrey: 500,
    sveta: 413,
    anton: 987,
    igor: 664,
    alexandra: 199
}
let sum = 0
for (let key in salaries) {
    sum += salaries[key]
}
let averageSum = sum / Object.keys(salaries).length
console.log(averageSum)

// Task 6
let user = {
    login: prompt('Введите логин'),
    password: prompt('Введите пароль'),
}

let loginChecker = prompt("Подтвердите логин:");
let passwordChecker = prompt("Подтвердите пароль:");

if (loginChecker === user.login && passwordChecker === user.password) {
  alert("Добро пожаловать!");
} else {
  alert("Неверный логин или пароль");
}

// Extra task 1
let numbersToWords = {
    0: 'ноль',
    1: 'один',
    2: 'два',
    3: 'три',
    4: 'четыре',
    5: 'пять',
    6: 'шесть',
    7: 'семь',
    8: 'восемь',
    9: 'девять',
}

let firstTeam = '';
let secondTeam = '';

function convertScore (score) {
    let correctScore = score.split(':')
    for (let key in numbersToWords) {
        if (Number(correctScore[0]) > 9 || Number(correctScore[1]) > 9) {
            console.log('Ошибка: счет не может превышать 9 голов для одной команды либо введены некорректные данные')
            break
        } else if (Number(key) === Number(correctScore[0])) {
            firstTeam = numbersToWords[key]
        } else if (Number(key) === Number(correctScore[1])){
            secondTeam = numbersToWords[key]
        }
    }
    
    if (firstTeam !== '' || secondTeam !== '') console.log(`Счёт: ${firstTeam}-${secondTeam}`)
}

convertScore('2:5')

// Extra task 2

// В JavaScript два объекта считаются равными только в том случае, если они ссылаются на одно и то же место в памяти. Даже если два объекта имеют одинаковые свойства и значения, они не будут считаться равными, потому что они занимают разные места в памяти.
// Если надо сравнить по свойствам, то:
function areObjectsEqual(obj1, obj2) {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

let student1 = {
    name: 'Polina',
    age: 27,
};

let student2 = {
    name: 'Polina',
    age: 27,
};

console.log(areObjectsEqual(student1, student2))

// Extra task 3
const animals = {
    cat: {
    name: 'Енчик',
    age: 3,
    },
    dog: {
    name: 'Орео',
    age: 2,
    }
}
console.log(animals.bird?.name)
import { User } from "./types";
import './styles.scss';

// С ниже приведенным массивом решить следующие задачи. Все функции и данные должны быть протипизированы:
// 1. Создать строку из имен пользователей через запятую
// 2. Подсчитать общее количество машин у пользователей
// 3. Создать функцию, которая бы принимала массив пользователей и отфильтровывала пользователей на наличие образования
// 4. Создать функцию, которая бы принимала массив пользователей и отфильтровывала пользователей на наличие животных
// 5. Создать функцию, которая бы принимала массив пользователей и отдавала бы строку с названиями марок автомобилей через запятую
// const users = [
//     {
//         name: "Harry Felton",
//         phone: "(09) 897 33 33",
//         email: "felton@gmail.com",
//         animals: ["cat"],
//         cars: ["bmw"],
//         hasChildren: false,
//         hasEducation: true
//     },
//     {
//         name: "May Sender",
//         phone: "(09) 117 33 33",
//         email: "sender22@gmail.com",
//         hasChildren: true,
//         hasEducation: true
//     },
//     {
//         name: "Henry Ford",
//         phone: "(09) 999 93 23",
//         email: "ford0@gmail.com",
//         cars: ["bmw", "audi"],
//         hasChildren: true,
//         hasEducation: false
//     }
// ]

const users: User[] = [
    {
        name: "Harry Felton",
        phone: "(09) 897 33 33",
        email: "felton@gmail.com",
        animals: ["cat"],
        cars: ["bmw"],
        hasChildren: false,
        hasEducation: true
    },
    {
        name: "May Sender",
        phone: "(09) 117 33 33",
        email: "sender22@gmail.com",
        hasChildren: true,
        hasEducation: true
    },
    {
        name: "Henry Ford",
        phone: "(09) 999 93 23",
        email: "ford0@gmail.com",
        cars: ["bmw", "audi"],
        hasChildren: true,
        hasEducation: false
    }
]

// 1. Создать строку из имен пользователей через запятую
const getUserNames = (users: User[]): string => {
    return users.map(user => user.name).join(', ');
}

console.log("Имена пользователей: ", getUserNames(users));

// 2. Подсчитать общее количество машин у пользователей
const getTotalCars = (users: User[]): number => {
    return users.reduce((total, user) => total + (user.cars ? user.cars.length : 0), 0);
}

console.log("Общее количество машин: ", getTotalCars(users));

// 3. Создать функцию, которая бы принимала массив пользователей и отфильтровывала пользователей на наличие образования
const filterUsersByEducation = (users: User[]): User[] => {
    return users.filter(user => user.hasEducation);
}

console.log("Пользователи с образованием: ", filterUsersByEducation(users));

// 4. Создать функцию, которая бы принимала массив пользователей и отфильтровывала пользователей на наличие животных
const filterUsersByAnimals = (users: User[]): User[] => {
    return users.filter(user => user.animals && user.animals.length > 0);
}

console.log("Пользователи с животными: ", filterUsersByAnimals(users));

// 5. Создать функцию, которая бы принимала массив пользователей и отдавала бы строку с названиями марок автомобилей через запятую
const getCarBrands = (users: User[]): string => {
    const carBrands: string[] = [];
    users.forEach(user => {
        if (user.cars) {
            carBrands.push(...user.cars);
        }
    });
    return carBrands.join(', ');
}

console.log("Марки автомобилей: ", getCarBrands(users));
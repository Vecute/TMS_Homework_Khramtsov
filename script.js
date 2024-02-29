"use strict"
// Task 1
const colors = ['red', 'green', 'blue']
console.log(colors.length)

// Task 2
const animals = ['monkey', 'dog', 'cat']
console.log(animals[animals.length-1])

// Task 3
const numbers = [5, 43, 63, 23, 90]
// 1 способ
numbers.length = 0
console.log(numbers)
// 2 способ
console.log(numbers.splice(0, numbers.length))

// Task 4
const students = ['Polina', 'Dasha', 'Masha']

students.pop()
students.push('Borya')
students.shift()
students.unshift('Andrey')
console.log(students)

// Task 5
const cats = ['Gachito', 'Tom', 'Batman']
// Решить через цикл for
for (let i = 0; i < cats.length; i++) {
    console.log(cats[i])
}
// Решить через цикл for..of
for (cat of cats) {
    console.log(cat)
}

// Task 6
const evenNumbers = [2, 4, 6, 8, 10]
const oddNumbers = [1, 3, 5, 7, 9]
const newNumbers = evenNumbers.concat(oddNumbers)
console.log(newNumbers.indexOf(8))

// Task 7
const binary = [0, 0, 0, 0]
console.log(binary.join('1'))

// Extra Task 1
function isPolindrome(word) {
    let lowerCaseWord = word.toLowerCase()
    let arrFromWord = lowerCaseWord.split('')
    let reversedArray = []

    for (let i = arrFromWord.length - 1; i >= 0; i--) {
        reversedArray.push(arrFromWord[i])
    }
    let reversedWord = reversedArray.join('');
    return (word === reversedWord ? 'Слово полиндром' : 'Слово не полиндром')
}

// Extra Task 2
const matrix = [
    [12, 98, 78, 65, 23],
    [54, 76, 98, 43, 65],
    [13, 324, 65, 312],
    [9092, 22, 45, 90000],
]
let newArray = matrix.join().split(',')
let sum = 0
for (number of newArray) {
    sum += Number(number)
}
let average = sum / newArray.length
console.log(average)

// Extra Task 3
const mixedNumbers = [-14, 24, -89, 43, 0 , -1, 412, 4]

const plusArray = []
const minusArray = []

for (number of mixedNumbers) number >= 0 ? plusArray.push(number) : minusArray.push(number)

console.log(plusArray, minusArray)

// Extra Task 4
let randomArray = []
for (let i = 0; i < 5; i++) {
    randomArray.push(Math.floor(Math.random() * 100))
}
let powArray = []
for (number of randomArray) {
    powArray.push(Math.pow(number, 3))
}
console.log(randomArray, powArray)
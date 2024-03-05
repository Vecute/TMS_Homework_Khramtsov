"use strict"
// Task 1
const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]
// arrow function
fibonacci.forEach(number => console.log(number))
// function declaration
fibonacci.forEach(function(number) {
    console.log(number)
})

// Task 2
const users = ['Darya', 'Masha', 'Denis', 'Vitaliy', 'Polina', 'Anton']
// arrow function
const newUsers = users.map((user, index) => `member ${index+1}: ${user}`)
// function declaration
const newUsers2 = users.map(function(user, index) {
    return `member ${index+1}: ${user}`
})

// Task 3
const numbers = [7, -4, 32, -90, 54, 32, -21]
// arrow function
const newNumber = numbers.filter(number => number >= 0)
// function declaration
const newNumber2 = numbers.filter(function(number) {
    return number >= 0
})

// Task 4
const fibonacci2 = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]
// arrow function
const sumFibonacci = fibonacci2.reduce((sum, current) => sum + current, 0)
// function declaration
const sumFibonacci2 = fibonacci2.reduce(function(sum, current) {
    return sum + current
}, 0)

// Task 5
const numbers2 = [5, 9, 13, 24, 54, 10, 13, 99, 1, 5]
// arrow function
const firstEven = numbers2.find(number => number % 2 === 0)
// function declaration
const firstEven2 = numbers2.find(function(number) {
    return number % 2 === 0
}, 0)

// Extra Task 1
function Student(salary, rate, name) {
    this.salary = salary
    this.rate = rate
    this.name = name
    this.possibleCredit = function () {
        switch (this.rate) {
            case 'A':
              return this.salary * 12
            case 'B':
              return this.salary * 9
            case 'C':
              return this.salary * 6
            case 'D':
              return 0
            default:
              alert('Рейтинг выставлен не корректно')
              break
          }
    }
}   
const student1 = new Student(1200, 'A', 'Gleb')
const student2 = new Student(1000, 'D', 'Nikita')
const student3 = new Student(1400, 'B', 'Viktoriya')
const student4 = new Student(1500, 'C', 'Nikita')
const student5 = new Student(1100, 'A', 'Anton')
const students = [student1, student2, student3, student4, student5]

function totalCredit(students) {
    let sum = 0
    students.forEach(student => sum += student.possibleCredit())
    return sum
}

console.log(totalCredit(students))

// Extra Task 2
function removeVowels(string) {
  const vowels = 'aeiouAEIOU'
  const characters = string.split('')
  const filteredCharacters = characters.filter(function(character) {
    return !vowels.includes(character)
  })
  const filteredString = filteredCharacters.join('');
  return filteredString
}

// Extra Task 3
// 1 способ
let newString = ''
function accum(string) {
  for (let i = 0; i < string.length; i++) {
    if (i == 0) {
      newString += string[0].toUpperCase() 
      newString += '-'
    } else if (i < string.length) {
      newString += string[i].toUpperCase() 
      newString += string[i].toLowerCase().repeat(i) 
      newString += '-'
    }
  }
  newString = newString.slice(0, newString.length - 1)
}
// 2 способ
function accum2(string) {
  return string.split('').map((letter, i) => (letter.toUpperCase() + letter.toLowerCase().repeat(i))).join('-');
}

// Extra Task 4
function highAndLow(string){
  string = string.split(' ');
  return Math.max.apply(null, string) + ' ' + Math.min.apply(null, string);
}

// Extra Task 5
function isIsogram (string) {
  string = string.toLowerCase()
  for (let i = 0; i < string.length; i++) {
    if (string.indexOf(string[i]) !== string.lastIndexOf(string[i])) {
      return false
    }
  }
  return true
}

// Extra Task 6
function countCodes (string) {
  let total1 = ''
  for (let i=0; i < string.length; i++) {
    total1 += string.charCodeAt(i)
  }
  let total2 = total1.replace(/7/g, '1')
  let sum1 = 0 
  let sum2 = 0 
  for (let i=0; i < total1.length; i++) {
    sum1 += +total1[i]
  }
  for (let i=0; i < total2.length; i++) {
    sum2 += +total2[i]
  }
  return sum1 - sum2
}

// Extra Task 7
function isDuplicate (string) {
  string = string.toLowerCase()
  result = ''
  for (let i = 0; i < string.length; i++) {
    if (string.indexOf(string[i]) !== string.lastIndexOf(string[i])) {
      result += ')'
    } else {
      result += '('
    }
  }
  return result
}
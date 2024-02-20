'use strict'

// Task 1
let x = 20
let y = 58
let z = 42

let sum = x + y + z

console.log(sum)

// Task 2
let secInMinute = 60
let minInHour = 60
let hourInDay = 24
let dayInYear = 365

let yourAge = prompt('Сколько тебе лет?')

let myAgeInSeconds = yourAge * dayInYear * hourInDay * minInHour * secInMinute

alert(`Ты прожил ${myAgeInSeconds} секунд`)

// Task 3
let count = 42
let userName = '42'
//Первый способ
let countString = String(count)
let userNameNumber = Number(userName)
//Второй способ
let countString2 = '' + count
let userNameNumber2 = +userName

// Task 4
let a = 1
let b = 2
let c = 'белых медведей'
let phrase = String(a)+String(b)+' '+c
let phrase2 = '' + a + '' + b + ' ' + c

console.log(phrase)
console.log(phrase2)

// Task 5
let var1 = 'доступ'
let var2 = 'морпех'
let var3 = 'наледь'
let var4 = 'попрек'
let var5 = 'рубило'

let lengthWords = var1.length + var2.length + var3.length + var4.length + var5.length
let lengthWords2 = (var1+var2+var3+var4+var5).length

console.log(lengthWords)
console.log(lengthWords2)

// Task 6
let first = `Привет мир`
let second = 777
let third = true

console.log(`Variable: first have type: ${typeof first}`)
console.log(`Variable: second have type: ${typeof second}`)
console.log(`Variable: third have type: ${typeof third}`)

// Task 7
let name = prompt('Как тебя зовут?')
let age = prompt('Сколько тебе лет?')

alert(`Тебя зовут ${name} и тебе ${age} лет`)
console.log(`Тебя зовут ${name} и тебе ${age} лет`)

// Extra Task 1
let a = 4
let b = 3

a = a + b
b = a - b
a = a - b

console.log(a,b)

// Extra Task 2
let codeWord1 = "обернись"
let codeWord2 = "неужели"
let codeWord3 = "огурцы"
let codeWord4 = "липкие"
let codeWord5 = "?!"

let cipher = codeWord1[1]+codeWord2[1]+codeWord3[1]+codeWord4[1]+codeWord5[1]

console.log(cipher)
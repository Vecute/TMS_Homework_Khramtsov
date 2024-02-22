'use strict'

// Task 1
function getSum(number) {
    let sum = 0
    for (var i = 0; i <= number; i++) {
        sum += i
    }
    console.log(sum)
}

// Task 2
function calcExtraMoney(price) {
    let years = 5
    let extraMoney = 0
    for (var i = 0; i < years; i++) {
        extraMoney += price/100*17
    }
    return extraMoney
}

// Task 3
function trimString(str, start, end) {
    return str.slice(start, end)
}

// Task 4
function getSumNumbers(number) {
    let str = number.toString();
    let sum = 0
    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i]);
    }
    return sum
}

// Task 5
function getSum(a, b) {
    let sum = 0
    if (a === b) return a || b
    for (let i = a; i <= b; i++) {
        sum += i;
    }
    return sum
}

// Task 6
function fooBoo(bool, foo, boo) {
    bool ? foo() : boo()
}

function foo() {
    console.log("foo");
}

function boo() {
    console.log("boo");
}

// Extra Task 1
function existTriangle(a, b, c) {
    return ((a + b > c) && (a + c > b) && (c + b > a)) ? true : false
 }

// Extra Task 2
 function calcFractures(n, m) {
    let vertical = 0
    let horizontal = 0
    if ((n === 0) || m === 0) return 0
    if (n > 1) {
        vertical = n - 1;
    }
    if (m > 1) {
        horizontal = m - 1;
    }
    return vertical+horizontal
}

// Extra Task 3
// Как работает моя программа: Программа запрашивает количество денег на балансе. Если баланс меньше стоимости телефона или пользователь отказался вводить сумму, то программа сообщит о недостатке средств. Если денег хватает, то программа добавит налог к сумме телефонов и аксессуаров. Затем будет считать сколько телефонов и аксессуаров ты покупаешь (телефон, аксессуар, телефон и т.д.). Как только деньги закончатся, программа покажет требуемую итоговую сумму и количество купленной техники, а также остаток по счёту.
const taxRate = 1.2
const pricePhone = 850.65
const priceAccessories = 80.55
let bankBalance = Number(prompt('Введите сумму вашего баланса на счёте')) || 0
let currentPrice = 0
let countPhones = 0
let countAccessories = 0
let taxPhone = 0
let taxAccessories = 0
let bankRemains = 0

function taxCollection() {
    taxPhone = pricePhone * taxRate
    taxAccessories = priceAccessories * taxRate
}
function findRemains() {
    bankRemains = bankBalance - currentPrice
}
taxCollection()
while (currentPrice < bankBalance) {
    currentPrice += taxPhone
    countPhones += 1
    if (currentPrice < bankBalance) {
        currentPrice += taxAccessories
        countAccessories += 1
    }
}
if (countPhones > countAccessories) {
    currentPrice = currentPrice - taxPhone
    countPhones -= 1
} else {
    currentPrice = currentPrice - taxAccessories
    countAccessories -= 1
}
findRemains()
if (bankBalance < taxPhone) {
    alert('На вашем счету недостаточно средств либо введено не число')
} else {
    alert(`Вы собираетесь потратить: $${currentPrice.toFixed(2)}. Количество телефонов: ${countPhones}. Количество аксессуаров: ${countAccessories}. Остаток на счёте: $${bankRemains.toFixed(2)}.`)
}
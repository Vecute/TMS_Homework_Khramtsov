'use strict'

// Task 1
let a = 'true'
let b = false
let c = 17
let d = undefined
let e = null

console.log(typeof(a), typeof(b), typeof(c), typeof(d), typeof(e))

// Task 2
let height = 15
let width = 20

if (height > width) {
    console.log(height)
} else {
    console.log(width)
}

// Task 3
for (let i = 1; i <21; i++) {
    if (i%3===0) {
        console.log(i)
    }
}

// Task 4
let key = true
let documents = true
let pen = true
let apple = false
let orange = true
let shouldGoToWork
if (key === true && documents && true && pen === true && (apple === true || orange === true)) {
    shouldGoToWork = true 
} else {
    shouldGoToWork = false
}
console.log(shouldGoToWork)

// Task 5
let value = prompt('Введите число')

if (value%5===0 && value%3!==0) {
    console.log('Fiz')
} else if (value%3===0 && value%5!==0) {
    console.log('Buz')
} else if (value%5===0 && value%3===0) {
    console.log('FizBuz')
}

// Task 6
let value = prompt('Введите свой возраст')

if (value > 18) {
    alert('Попей пивка')
} else if (value >= 16 && value <=18) {
    alert('Можешь выкурить сигаретку, только маме не говори')
} else {
    alert('Пей колу')
}

// Task 7
let side = prompt('В какую сторону света ты бы хотел отправиться')
switch (side) {
    case 'юг':
    alert( 'на юг пойдешь счастье найдешь');
    break;
    case 'север':
    alert( 'на север пойдешь много денег найдешь');
    break;
    case 'запад':
    alert( 'на запад пойдешь верного друга найдешь');
    break;
    case 'восток':
    alert( 'на восток пойдешь разработчиком станешь');
    break;
    default:
    alert( 'Попробуй заново');
}

// Extra Task 1
let name = 'пОлИнА нАбЕрЕжНаЯ'
let nameInLowercase = name.toLowerCase()
let nameFixed = nameInLowercase[0].toUpperCase() + nameInLowercase.slice(1,6) + ' ' + nameInLowercase[7].toUpperCase() + nameInLowercase.slice(8)
alert(`Привет, ${nameFixed}!`)

// Extra Task 2
let num = +prompt('Введите число')
let minus = +prompt('Сколько отнять?')
let plus = +prompt('Сколько прибавить?')
let multiplication = +prompt('На сколько умножить?')
let division = +prompt('На сколько поделить?')
let total = (num-minus+plus)*multiplication/division

alert(`((((${num}-${minus})+${plus})*${multiplication})/${division})=${total}`)

// Extra Task 3
let grids=''
for (let i = 1; i <7; i++) {
    grids+='#'
    console.log(grids)
}
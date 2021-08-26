'use strict';

let money,
    income,
    addExpenses,
    deposit,
    mission,
    period;

alert('Hello, World!');
console.log('Hello, World!');

money = 350000;
income = 'Фриланс';
addExpenses = 'Английский, фитнес, косметолог';
deposit = true;
mission = 3500000;
period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay;
budgetDay = money/30;
console.log(budgetDay);
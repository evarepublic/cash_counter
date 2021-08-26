"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = "Фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 3500000,
  period = 12;

let start = function () {
  do {
    money = prompt("Ваш месячный доход?");
  } while (!isNumber(money));
  // while (money === null || money.trim() === "" || isNaN(money)) {
  //   money = prompt("Ваш месячный доход?");
  // }
};

start();

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(", "));

let expenses = [];
let amount = [];

function getExpensesMonth() {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");
    do {
      amount[i] = prompt("Во сколько это обойдётся?");
    } while (!isNumber(amount[i]));
    sum += +amount[i];
  }
  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

console.log("Расходы за месяц: " + expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
}

let accumulatedMonth = getAccumulatedMonth();
// Бюджет на месяц без вынужденных трат

function getTargetMonth() {
  if (Math.ceil(mission / accumulatedMonth) < 0) {
    return false;
  } else {
    return Math.ceil(mission / accumulatedMonth);
  }
}

if (getTargetMonth()) {
  console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев`);
} else {
  console.log(`Цель не будет достигнута`);
}

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Бюджет на день: ${budgetDay}`);

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода!";
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay <= 600 && budgetDay > 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else if (budgetDay < 0) {
    return "Что то пошло не так";
  } else if (budgetDay == 0) {
    return "Вы не зарабатываете";
  } else {
    return "Ошибка";
  }
};

console.log(getStatusIncome());
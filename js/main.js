"use strict";

let money = +prompt("Ваш месячный доход?", 150000),
  income = "Фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 3500000,
  period = 12;

let showTypeOf = function (data) {
  console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(", "));

function getExpensesMonth() {
  let expenses1 = prompt(
    "Введите первую обязательную статью расходов?",
    "Квартплата"
  ),
  amount1 = +prompt("Во сколько это обойдется?", "5000"),
  expenses2 = prompt(
    "Введите вторую обязательную статью расходов?",
    "Интернет"
  ),
  amount2 = +prompt("Во сколько это обойдется?", "500");
  return amount1 + amount2;
}

console.log(getExpensesMonth());

function getAccumulatedMonth() {
  return money - getExpensesMonth();
}

let accumulatedMonth = getAccumulatedMonth(); 
// Бюджет на месяц без вынужденных трат

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
console.log(`Цель будет достигнута за ${getTargetMonth()} месяцев`);

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(`Бюджет на день: ${budgetDay}`);

let getStatusIncome = function() {
  if (budgetDay >= 1200) {
    return ("У вас высокий уровень дохода!");
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return ("У вас средний уровень дохода");
  } else if (budgetDay <= 600 && budgetDay > 0) {
    return ("К сожалению у вас уровень дохода ниже среднего");
  } else if (budgetDay < 0) {
    return ("Что то пошло не так");
  } else if (budgetDay == 0) {
    return ("Вы не зарабатываете");
  } else {
    return ("Ошибка");
  }
};

console.log(getStatusIncome());
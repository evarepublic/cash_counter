'use strict';

let money = +prompt("Ваш месячный доход?", 150000),
  income = "Фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?"),
  mission = 3500000,
  period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

addExpenses = addExpenses.toLowerCase();
console.log(addExpenses.split(", "));

let budgetDay = money / 30;

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

let expenses = amount1 + amount2;

let budgetMonth = budgetDay * 30 - expenses;
console.log(`Бюджет на месяц: ${budgetMonth}`);

let purposeTime = mission / budgetMonth;
purposeTime = Math.ceil(purposeTime);
console.log(`Цель будет достигнута за ${purposeTime} месяцев`);

budgetDay -= expenses / 30;
console.log(`Бюджет на день: ${Math.floor(budgetDay)}`);

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода!");
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay <= 600 && budgetDay > 0) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay < 0) {
  console.log("Что то пошло не так");
} else if (budgetDay == 0) {
  console.log("Вы не зарабатываете");
} else {
  console.log("Ошибка");
}
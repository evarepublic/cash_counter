"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = prompt("Ваш месячный доход?");
    } while (!isNumber(money));
  };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 2500000,
  period: 12,
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    let expenses = [];
    let amount = [];
    let expensesName;
    let expensesCost;
    for (let i = 0; i < 2; i++) {
      expenses[i] = prompt("Введите обязательную статью расходов");
      expensesName = expenses[i].toLowerCase();
      do {
        amount[i] = prompt("Во сколько это обойдется?");
        expensesCost = +amount[i];
      } while (!isNumber(amount[i]));
      appData.expenses[expensesName] = expensesCost;
    }
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },
  getBudget: function () {
    appData.expensesMonth = appData.getExpensesMonth();
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    let requiredPeriod = Math.ceil(appData.mission / appData.budgetMonth);
    if (requiredPeriod > 0) {
      console.log("Цель будет достигнута за: " + requiredPeriod + " месяцев");
    } else {
      console.log("Цель не будет достигнута");
    }
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода!";
    } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay <= 600 && appData.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (appData.budgetDay < 0) {
      return "Что то пошло не так";
    } else if (appData.budgetDay == 0) {
      return "Вы не зарабатываете";
    } else {
      return "Ошибка";
    }
  },
};

appData.asking();
appData.getBudget();
appData.getTargetMonth();
console.log(appData.getStatusIncome());

function incomingData() {
  console.log("Наша программа включает в себя данные: ");
  for (let key in appData) {
    console.log(key + ": " + appData[key]);
  }
}

incomingData();
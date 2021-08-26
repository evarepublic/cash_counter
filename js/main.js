"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let isNotText = function (n) {
  return n === null || n.trim() === "" || !isNaN(+n);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 2500000,
  period: 12,
  asking: function () {
    if (confirm("Есть ли у вас дополнительный источник заработка?")) {
      let itemIncome;
      do {
        itemIncome = prompt(
          "Какой у вас дополнительный заработок?",
          "Преподаю английский"
        );
      } while (isNotText(itemIncome));
      let cashIncome;
      do {
        cashIncome = prompt("Какой доход это приносит?", 20000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    for (let i = 0; i < 2; i++) {
      let itemExpenses;
      do {
        itemExpenses = prompt(
          "Введите обязательную статью расходов"
        ).toLowerCase();
      } while (isNotText(itemExpenses));
      let cashExpenses;
      do {
        cashExpenses = prompt("Во сколько это обойдется?");
      } while (!isNumber(cashExpenses));
      appData.expenses[itemExpenses] = cashExpenses;
    }
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getExpensesMonth();
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

appData.getInfoDeposit();
console.log("appData.percentDeposit: ", appData.percentDeposit);
console.log("appData.moneyDeposit: ", appData.moneyDeposit);
console.log(appData.calcSavedMoney());

console.log(
  appData.addExpenses
    .map(function (value) {
      return value[0].toUpperCase() + value.substr(1);
    })
    .join(", ")
);

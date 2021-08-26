"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isNotText = function (n) {
  return n === null || n.trim() === "" || !isNaN(+n);
};

const start = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  depositCheck = document.querySelector("#deposit-check"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName(
    "expenses_month-value"
  )[0],
  accumulatedMonthValue = document.getElementsByClassName(
    "accumulated_month-value"
  )[0],
  additionalIncomeValue = document.getElementsByClassName(
    "additional_income-value"
  )[0],
  additionalExpensesValue = document.getElementsByClassName(
    "additional_expenses-value"
  )[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  expensesTitle = document.querySelector(".expenses-title"),
  additionalExpenses = document.querySelector(".additional_expenses-item"),
  periodSelect = document.querySelector(".period-select"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodAmount = document.querySelector(".period-amount");

let expensesItems = document.querySelectorAll(".expenses-items"),
incomeItems = document.querySelectorAll(".income-items");

let inputNameValid = document.querySelectorAll("[placeholder='Наименование']");
let inputAmountValid = document.querySelectorAll("[placeholder='Сумма']");

const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  calcResult: function () {
    if (salaryAmount.value === "") {
      start.removeEventListener("click", appData.start);
      return;
    }
    appData.start();
  },
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener("change", function () {
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    const expensesItemsArr = cloneExpensesItem.querySelectorAll("input");
    expensesItemsArr.forEach((item) => {
      item.value = "";
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
    inputNameValid = document.querySelectorAll("[placeholder='Наименование']");
    inputAmountValid = document.querySelectorAll("[placeholder='Сумма']");

    inputNameValid.forEach(function (item) {
      item.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ\s]+$/, "");
      });
    });

    inputAmountValid.forEach(function (item) {
      item.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/[^0-9]+$/, "");
      });
    });
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function () {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    const incomeItemsArr = cloneIncomeItem.querySelectorAll("input");
    incomeItemsArr.forEach((item) => {
      item.value = "";
    });
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
    inputNameValid = document.querySelectorAll("[placeholder='Наименование']");
    inputAmountValid = document.querySelectorAll("[placeholder='Сумма']");

    inputNameValid.forEach(function (item) {
      item.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ\s]+$/, "");
      });
    });

    inputAmountValid.forEach(function (item) {
      item.addEventListener("input", function (event) {
        event.target.value = event.target.value.replace(/[^0-9]+$/, "");
      });
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = cashIncome;
      }
    });
  },
  getAddExpenses: function () {
    const addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  changePeriodValue: function () {
    periodAmount.textContent = periodSelect.value;
  },
  getExpensesMonth: function () {
    for (const key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getIncomeMonth: function () {
    for (const key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    const requiredPeriod = Math.ceil(targetAmount.value / appData.budgetMonth);
    return requiredPeriod;
    // if (requiredPeriod > 0) {
    //   console.log("Цель будет достигнута за: " + requiredPeriod + " месяцев");
    // } else {
    //   console.log("Цель не будет достигнута");
    // }
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
    } else if (appData.budgetDay === 0) {
      return "Вы не зарабатываете";
    } else {
      return "Ошибка";
    }
  },
  getInfoDeposit: function () {
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};

start.addEventListener("click", appData.calcResult);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("change", appData.changePeriodValue);

inputNameValid.forEach(function (item) {
  item.addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^а-яА-ЯёЁ\s]+$/, "");
  });
});

inputAmountValid.forEach(function (item) {
  item.addEventListener("input", function (event) {
    event.target.value = event.target.value.replace(/[^0-9]+$/, "");
  });
});

// appData.getTargetMonth();

// function incomingData() {
//   console.log("Наша программа включает в себя данные: ");
//   for (let key in appData) {
//     console.log(key + ": " + appData[key]);
//   }
// }

// incomingData();

// appData.getInfoDeposit();
// console.log("appData.percentDeposit: ", appData.percentDeposit);
// console.log("appData.moneyDeposit: ", appData.moneyDeposit);
// console.log(appData.calcSavedMoney());

// console.log(
//   appData.addExpenses
//     .map(function (value) {
//       return value[0].toUpperCase() + value.substr(1);
//     })
//     .join(", ")
// );
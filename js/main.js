"use strict";

const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

const isPercent = (n) => isNumber(n) && n >= 0 && n <= 100;

const isNotText = (n) => n === null || n.trim() === "" || !isNaN(+n);

const startBtn = document.getElementById("start"),
  cancelBtn = document.getElementById("cancel"),
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
  periodAmount = document.querySelector(".period-amount"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent");

let inputAreas = document.querySelectorAll('input[type="text"]'),
  dataInputAreas = document.querySelectorAll('.data input[type="text"]'),
  expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  inputNameValid = document.querySelectorAll("[placeholder='Наименование']"),
  inputAmountValid = document.querySelectorAll("[placeholder='Сумма']");

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  start() {
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getMonthValue();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();

    this.showResults();
    this.replaceBtn();
  }

  begin() {
    if (!salaryAmount.value) {
      startBtn.removeEventListener("click", this.begin.bind(this));
      return;
    }
    this.start();
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split("-")[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);
  }

  getMonthValue() {
    const sum = (obj) => {
      let res = 0;
      for (let key in obj) {
        res += +obj[key];
      }
      return res;
    };
    this.incomeMonth = sum(this.income);
    this.expensesMonth = sum(this.expenses);
  }

  getAddExpInc() {
    const valid = (item, i, arr) => {
      const dataArr =
        typeof arr[i] === "string" ? this.addExpenses : this.addIncome;
      if (typeof item !== "string") {
        item = item.value.trim();
      } else {
        item = item.trim();
      }
      if (item) {
        dataArr.push(item);
      }
    };
    additionalExpensesItem.value.split(", ").forEach(valid);
    additionalIncomeItem.forEach(valid);
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода!";
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else if (this.budgetDay < 0) {
      return "Что то пошло не так";
    } else if (this.budgetDay === 0) {
      return "Вы не зарабатываете";
    } else {
      return "Ошибка";
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
    this.getStatusIncome();
  }

  inputValid() {
    const nameValid = () => {
      document
        .querySelectorAll("[placeholder='Наименование']")
        .forEach((item) => {
          item.addEventListener(
            "input",
            (e) =>
              (e.target.value = e.target.value.replace(/[^а-яА-ЯёЁ\s]+$/, ""))
          );
        });
    };
    const amountValid = () => {
      document.querySelectorAll("[placeholder='Сумма']").forEach((item) => {
        item.addEventListener(
          "input",
          (e) => (e.target.value = e.target.value.replace(/[^0-9]+$/, ""))
        );
      });
    };
    nameValid();
    amountValid();
  }

  addBlock(e) {
    const type = e.target.classList[1].split("_")[0];
    let items = document.querySelectorAll(`.${type}-items`);

    if (items.length >= 2) {
      e.target.style.display = "none";
    }

    const cloneItem = items[0].cloneNode(true);
    const itemInputs = cloneItem.querySelectorAll("input");

    itemInputs.forEach((item) => (item.value = ""));

    items[items.length - 1].insertAdjacentElement("afterend", cloneItem);
    this.research(type);

    this.inputValid();
  }

  research(type) {
    if (type === "income") {
      incomeItems = document.querySelectorAll(".income-items");
    } else if (type === "expenses") {
      expensesItems = document.querySelectorAll(".expenses-items");
    }
    inputAreas = document.querySelectorAll('input[type="text"]');
    dataInputAreas = document.querySelectorAll('.data input[type="text"]');
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  disabledForm() {
    dataInputAreas.forEach((item) => {
      item.disabled = true;
    });
    expensesPlus.removeEventListener("click", this.addBlock.bind(this));
    expensesPlus.style.display = "none";
    incomePlus.removeEventListener("click", this.addBlock.bind(this));
    incomePlus.style.display = "none";
    depositCheck.disabled = true;
    if (depositBank.style.display === "inline-block") {
      depositBank.disabled = true;
      console.log("done");
    }
  }

  showResults() {
    this.disabledForm();
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener("change", () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }

  changePeriodValue() {
    periodAmount.textContent = periodSelect.value;
  }

  replaceBtn() {
    cancelBtn.style.display = "block";
    startBtn.replaceWith(cancelBtn);
    cancelBtn.addEventListener("click", this.reset.bind(this));
  }

  resetProperties(obj) {
    for (let key in obj) {
      if (typeof obj[key] === "number") {
        obj[key] = 0;
      } else if (typeof obj[key] === "boolean") {
        obj[key] = false;
      } else if (typeof obj[key] === "object" && obj[key] instanceof Array) {
        obj[key] = [];
      } else if (typeof obj[key] === "object") {
        obj[key] = {};
      } else if (typeof obj[key] === "function") {
        continue;
      }
    }
  }

  resetForm() {
    inputAreas.forEach((item) => {
      item.value = "";
      item.disabled = false;
    });
    depositCheck.checked = false;
    periodSelect.value = 1;
    this.changePeriodValue();
    cancelBtn.style.display = "none";
    cancelBtn.replaceWith(startBtn);
  }

  rebootForm() {
    expensesPlus.addEventListener("click", this.addBlock.bind(this));
    expensesPlus.style.display = "block";
    incomePlus.addEventListener("click", this.addBlock.bind(this));
    incomePlus.style.display = "block";
    depositCheck.disabled = false;
  }

  reset() {
    this.resetProperties(this);
    this.resetForm();
    this.rebootForm();
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  validPercentValue(e) {
    const value = e.target.value;
    // не работает удаление обработчика - почему?
    startBtn.removeEventListener("click", this.begin.bind(this));
    if (isPercent(value)) {
      startBtn.addEventListener("click", this.begin.bind(this));
    } else {
      alert("Введите корректное значение в поле проценты");
    }
  }

  changePercent(e) {
    const selectedValue = e.target.value;
    if (selectedValue === "other") {
      depositPercent.value = "";
      depositPercent.style.display = "inline-block";
      depositPercent.addEventListener(
        "change",
        this.validPercentValue.bind(this)
      );
    } else {
      depositPercent.value = selectedValue;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent.bind(this));
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent.bind(this));
    }
  }

  eventListeners() {
    this.inputValid();
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
    startBtn.addEventListener("click", this.begin.bind(this));
    periodSelect.addEventListener("change", this.changePeriodValue.bind(this));
    this.rebootForm();
  }
}

const appData = new AppData();
appData.eventListeners();

'use strict';
let startBtn = document.getElementById('start');
let value = document.querySelectorAll('.budget, .budget-value, .daybudget, .daybudget-value, .level, .level-value, .expenses, .expenses-value, .optionalexpenses, .optionalexpenses-value,  .income, .income-value, .monthsavings, .monthsavings-value, .yearsavings, .yearsavings-value ');
let input = document.querySelectorAll('.expenses-item');
let button = document.getElementsByTagName('button');
let accept = button[0];
let calculate = button[2];
let optionalExpenses = document.querySelectorAll('.optionalexpenses-item');
let chooseIncome = document.querySelector('.choose-income');
let chooseSum = document.querySelector('.choose-sum');
let choosePercent = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');
/*Готовые функции для приложения из прошлых уроков */

let money;
let time;
startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", " ");
    money = +prompt(" Ваш бюджет на месяц", "");
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt(" Ваш бюджет на месяц", "");
    }
    appData.time = time;
    appData.budget = money;
    value[1].textContent = money.toFixed(); // округление и вывод на экран
    // работаем с атрибутом тэга input - value - это предпочтительнее чем textContent
    yearValue.value = new Date(Date.parse(time)).getFullYear(); // parse(time) переводит полученную дату в милисекунды отсчитанные от 1970г, затем выделяем из них нужные значения год, месяц, день
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1; // +1 потомучто в js все начинается с нуля
    dayValue.value = new Date(Date.parse(time)).getDate();
});

accept.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        let a = input[i].value, // атрибут value тэга input содержит пользовательский ввод
            b = input[++i].value;// префиксная запись сразу инкримирует и возвращает, а постфиксная сначала возвращает а потом инкримирует
        if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null
            && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b; // +b  чтобы передавалось число/  и суммируем все поля
        }
        else {
            i = i - 1;  // благодаря этому условию цикл будет повторться пока два раза не будут заполнены prompt
        }
    }
    value[7].textContent = sum;
});

button[1].addEventListener('click', function () {
    let j = 0, k = 0;    // проще конечно использовать цикл for, но это для примера
    while (j < optionalExpenses.length) {
        let g = optionalExpenses[j].value;
        if ((typeof (g)) === 'string' && (typeof (g)) != null
            && g != '' && g.length < 50) {
            console.log('Done');
            appData.optionalExpenses[k] = g;
            value[11].textContent += appData.optionalExpenses[j] + ' '; // выводим динамически на страницу каждое введенное в поле значение
            j++; // счетчик цикла
            k++; // индекс добавляемой записи 
        }
        else {
            j = j - 1;
        }

    }
});
  button[2].addEventListener('click', function(){
     value[3].textContent = (appData.budget/30).toFixed();
     }); 


// Главный объект программы
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: true,

   
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            alert('Минимальный уровень достатка');
        }
        else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            alert('Средний уровень достатка');
        }
        else if (appData.moneyPerDay > 2000) {
            alert(' Высокий уровень достатка');
        }
        else { alert('Что-то пошло не так')}
    },
    checkSaving: function () {
        if (appData.saving == true) {
            let save = +prompt('Какова сумма ваших накоплений?'),
                percent = +prompt(' под какой процент?');
            appData.monthIncome = (save / 12 / 100 * percent).toFixed(2);
        }
        alert(' Доход в месяц с вашего депозита: ' + appData.monthIncome);
    },

    chooseIncome: function () {
        for (let i = 0; i < 1; i++) {
            let income = prompt('Другие способы получения дохода (введите через запятую)');
            let income2 = prompt('Может что-то еще?');
            if (typeof (income) === "string" && income != '' && typeof (income2) === "string" && income2 != '') {
                income += ',' + income2;
                appData.income = income.split(",");
                appData.income.sort();
            }
            else { i = i - 1; }
        }
        appData.income.forEach(function (item, i) { alert('Способы доп. заработка:' + ' ' + (i + 1) + ' ' + item) }) // (i+1) цикл будет выводить элементы начиная с индекса 1

    },
    showAllobj: function () {
        console.log('Наша программа включает в себя:' + ' ');
        for (let key in appData) {
            console.log(key/* + appData[key] */ + ' ' + typeof (appData[key]));
        }
    }
}

/*Конец готовых функций */
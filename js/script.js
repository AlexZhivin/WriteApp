'use strict';
/*Лучше вместо коллекции value создавать отдельные переменные для каждого значения чтобы не путаться в номерах индексов*/
let startBtn = document.getElementById('start');
let value = document.querySelectorAll('.budget, .budget-value, .daybudget, .daybudget-value, .level, .level-value, .expenses, .expenses-value, .optionalexpenses, .optionalexpenses-value,  .income, .income-value, .monthsavings, .monthsavings-value, .yearsavings, .yearsavings-value ');
let input = document.querySelectorAll('.expenses-item');
let button = document.getElementsByTagName('button');
let accept = button[0];
let calculate = button[2];
let checkSaving = document.getElementById('savings');
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
            value[9].textContent += appData.optionalExpenses[j] + ' '; // выводим динамически на страницу каждое введенное в поле значение
            j++; // счетчик цикла
            k++; // индекс добавляемой записи 
        }
        else {
            j = j - 1;
        }

    }
});
button[2].addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        value[3].textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            value[5].textContent = 'Минимальный уровень достатка';
        }
        else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            value[5].textContent = 'Средний уровень достатка';
        }
        else if (appData.moneyPerDay > 2000) {
            value[5].textContent = ' Высокий уровень достатка';
        }
        else { value[5].textContent = 'Что-то пошло не так' };
    }
    else {
        value[3].textContent = " Необходимо начать расчет!";
    }
});

chooseIncome.addEventListener('input' /*'change'*/, function () { // событие change срабатывает когда мышь перемещается с поля ввода в любую область и происходит click 
    let income = chooseIncome.value;
    appData.income = income.split(",");
    value[11].textContent = appData.income;
});

checkSaving.addEventListener('click', function(){  // если при клике на checkbox  свойство saving установлено true то переводим в false. Затем еще раз кликаем и переводим в true  
    if (appData.saving == true){
        appData.saving = false;
    } else {
        appData.saving = true;
    }
});

chooseSum.addEventListener('input', function(){
    if (appData.saving == true){
        let summ = +chooseSum.value,
        percent = +choosePercent.value;
        appData.monthIncome = (summ / 12 / 100 * percent).toFixed(1);
        appData.yearIncome = (summ / 100 * percent).toFixed(1);
        value[13].textContent =appData.monthIncome;
        value[15].textContent =appData.yearIncome;
    }
});
choosePercent.addEventListener('input', function(){
    if (appData.saving == true){
        let summ = +chooseSum.value,
        percent = +choosePercent.value;
        appData.monthIncome = (summ / 12 / 100 * percent).toFixed(1);
        appData.yearIncome = (summ / 100 * percent).toFixed(1);
        value[13].textContent =appData.monthIncome;
        value[15].textContent =appData.yearIncome;
    }
});


// Главный объект программы
let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    saving: false,
};


/*Конец готовых функций */
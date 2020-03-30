"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee_1 = require("./Employee");
var randomNumber_1 = require("./Utils/randomNumber");
var historyLog_1 = require("./Utils/historyLog");
var currencyFormatter = require('currency-formatter');
var Company = /** @class */ (function () {
    function Company(name) {
        this.INTERVAL_TICK = .005 * 1000;
        this.STARTING_STAFF = 10;
        this.timer = {};
        this.historyLog = new historyLog_1.HistoryLog();
        this.employees = [];
        this.timerCount = 0;
        this.name = name;
        this.init();
    }
    Company.prototype.init = function () {
        this.employees = this.hireInitialStaff();
        this.historyLog.showHistory();
        this.timer = setInterval(this.onTimerInterval.bind(this), this.INTERVAL_TICK);
    };
    Company.prototype.hireInitialStaff = function () {
        var newEmployeeArray = [];
        for (var i = 0; i < this.STARTING_STAFF; i++) {
            newEmployeeArray.push(this.createEmployee());
        }
        return newEmployeeArray;
    };
    Company.prototype.createEmployee = function () {
        var newEmployee = new Employee_1.Employee();
        var positionLevel = randomNumber_1.randomNumber(0, 5);
        for (var j = 0; j < positionLevel; j++) {
            newEmployee.promote();
        }
        this.historyLog.addNewEmployee(newEmployee);
        return newEmployee;
    };
    Company.prototype.onTimerInterval = function () {
        this.timerCount += 1;
        this.randomEvent();
    };
    Company.prototype.randomEvent = function () {
        var randomChange = randomNumber_1.randomNumber(1, 100);
        switch (randomChange) {
            case 1 | 5 | 6 | 7 | 8:
                this.employees.push(this.createEmployee());
                // Another option for updating an array...
                // const updatedEmployeeArray: Employee[] = [
                //     ...this.employees,
                //     this.createEmployee()
                // ];
                // this.employees = updatedEmployeeArray;
                break;
            case 2:
                // employee quits
                this.removeEmployee(true);
                break;
            case 3:
                // employee is fired!
                this.removeEmployee(false);
                break;
            case 4:
                // employee is promoted!
                this.promoteEmployee();
                break;
        }
    };
    Company.prototype.removeEmployee = function (quit) {
        if (this.employees.length <= 1)
            return;
        var randomEmployee = randomNumber_1.randomNumber(0, this.employees.length - 1);
        var employee = this.employees[randomEmployee];
        if (quit) {
            this.historyLog.quitEmployee(employee);
        }
        else {
            this.historyLog.fireEmployee(employee);
        }
        this.employees.splice(randomEmployee, 1);
        return this.employees;
    };
    Company.prototype.promoteEmployee = function () {
        var randomEmployee = randomNumber_1.randomNumber(0, this.employees.length - 1);
        var employee = this.employees[randomEmployee];
        employee.promote();
        this.historyLog.promoteEmployee(employee);
    };
    // private getRandomEmployee(): Employee {
    //     const randomEmployee: number = randomNumber(0, this.employees.length - 1);
    //     const employee: Employee = this.employees[randomEmployee];
    //     return employee
    // }
    // GETTERS AND SETTERS
    Company.prototype.getName = function () {
        return this.name;
    };
    Company.prototype.setName = function (name) {
        this.name = name;
    };
    Company.prototype.getHistory = function () {
        return this.historyLog.getHistory();
    };
    Company.prototype.getAllEmployees = function () {
        return this.employees;
    };
    Company.prototype.getAllSalaries = function () {
        var salaryArray = [];
        var totalSalary = 0;
        for (var _i = 0, _a = this.employees; _i < _a.length; _i++) {
            var employee = _a[_i];
            var employeeSalary = employee.getSalary();
            var formattedSalary = currencyFormatter.format(employeeSalary, { code: 'USD' });
            salaryArray.push(formattedSalary);
            totalSalary += employeeSalary;
        }
        var formattedTotal = currencyFormatter.format(totalSalary, { code: 'USD' });
        salaryArray.push(formattedTotal);
        return salaryArray;
    };
    return Company;
}());
exports.Company = Company;

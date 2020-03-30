"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var currencyFormatter = require('currency-formatter');
var HistoryLog = /** @class */ (function () {
    function HistoryLog() {
        this.log = [];
    }
    HistoryLog.prototype.addNewEmployee = function (employee) {
        var salary = currencyFormatter.format(employee.getSalary(), { code: 'USD' });
        var timeStamp = moment_1.default().format('lll');
        this.log.push(timeStamp + " - " + employee.getFullName() + " joined the team as a " + employee.getPosition() + ", making " + salary + " a year!");
    };
    HistoryLog.prototype.promoteEmployee = function (employee) {
        var salary = currencyFormatter.format(employee.getSalary(), { code: 'USD' });
        var timeStamp = moment_1.default().format('lll');
        this.log.push(timeStamp + " - " + employee.getFullName() + " got PROMOTED, making " + salary + "!");
    };
    HistoryLog.prototype.fireEmployee = function (employee) {
        var timeStamp = moment_1.default().format('lll');
        this.log.push(timeStamp + " - " + employee.getFullName() + " was FIRED!");
    };
    HistoryLog.prototype.quitEmployee = function (employee) {
        var timeStamp = moment_1.default().format('lll');
        this.log.push(timeStamp + " - " + employee.getFullName() + " quit! :(");
    };
    HistoryLog.prototype.showHistory = function () {
        console.log(this.log);
    };
    HistoryLog.prototype.getHistory = function () {
        return this.log;
    };
    return HistoryLog;
}());
exports.HistoryLog = HistoryLog;

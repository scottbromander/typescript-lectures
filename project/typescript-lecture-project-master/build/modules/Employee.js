"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Position_1 = require("./Enums/Position");
var data = __importStar(require("../modules/Data/names.json"));
var randomNumber_1 = require("./Utils/randomNumber");
var MeritIncrease_1 = require("./Enums/MeritIncrease");
var Employee = /** @class */ (function () {
    function Employee(firstName, lastName, salary, position) {
        this.firstName = firstName ? firstName : this.generateFirstName();
        this.lastName = lastName ? lastName : this.generateLastName();
        this.salary = salary ? salary : randomNumber_1.randomNumber(40000, 60000);
        this.position = position ? position : Position_1.Position.ASSOCIATE;
    }
    Employee.prototype.generateFirstName = function () {
        return data.first_names[randomNumber_1.randomNumber(0, data.first_names.length - 1)];
    };
    Employee.prototype.generateLastName = function () {
        return data.last_names[randomNumber_1.randomNumber(0, data.last_names.length - 1)];
    };
    Employee.prototype.promote = function () {
        switch (this.position) {
            case Position_1.Position.ASSOCIATE:
                this.position = Position_1.Position.ANALYST;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.ANALYST);
                break;
            case Position_1.Position.ANALYST:
                this.position = Position_1.Position.SENIOR_ANALYST;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.SENIOR_ANALYST);
                break;
            case Position_1.Position.SENIOR_ANALYST:
                this.position = Position_1.Position.MANAGER;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.MANAGER);
                break;
            case Position_1.Position.MANAGER:
                this.position = Position_1.Position.SENIOR_MANAGER;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.SENIOR_MANAGER);
                break;
            case Position_1.Position.SENIOR_MANAGER:
                this.position = Position_1.Position.DIRECTOR;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.DIRECTOR);
                break;
            case Position_1.Position.DIRECTOR:
                this.position = Position_1.Position.VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.VICE_PRESIDENT);
                break;
            case Position_1.Position.VICE_PRESIDENT:
                this.position = Position_1.Position.SENIOR_VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.SENIOR_VICE_PRESIDENT);
                break;
            case Position_1.Position.SENIOR_VICE_PRESIDENT:
                this.position = Position_1.Position.PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease_1.MeritIncrease.PRESIDENT);
                break;
            default:
                break;
        }
    };
    Employee.prototype.meritIncrease = function (percentage) {
        //EXAMPLE:   50000 * (1 * 0.05) = 52500
        return Math.floor(this.salary * (1 + percentage));
    };
    Employee.prototype.getFirstName = function () {
        return this.firstName;
    };
    Employee.prototype.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    Employee.prototype.getLastName = function () {
        return this.lastName;
    };
    Employee.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    Employee.prototype.getSalary = function () {
        return this.salary;
    };
    Employee.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Employee.prototype.getPosition = function () {
        return this.position;
    };
    Employee.prototype.setPosition = function (position) {
        this.position = position;
    };
    Employee.prototype.getFullName = function () {
        return this.firstName + " " + this.lastName;
    };
    return Employee;
}());
exports.Employee = Employee;

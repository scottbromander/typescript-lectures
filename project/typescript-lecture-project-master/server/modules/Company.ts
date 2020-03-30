import { Employee } from "./Employee";
import { randomNumber } from "./Utils/randomNumber";
import { HistoryLog } from "./Utils/historyLog";

const currencyFormatter = require('currency-formatter');

export class Company {

    private readonly INTERVAL_TICK: number = .005 * 1000;
    private readonly STARTING_STAFF: number = 10;

    private timerCount: number;
    private timer: Object = {};
    private name: string;

    private historyLog: HistoryLog = new HistoryLog();

    private employees: Employee[] = [];

    constructor(name: string) {
        this.timerCount = 0;
        this.name = name;
        this.init();
    }

    private init(): void {
        this.employees = this.hireInitialStaff();
        this.historyLog.showHistory();
        this.timer = setInterval(this.onTimerInterval.bind(this), this.INTERVAL_TICK);
    }

    private hireInitialStaff(): Employee[] {
        const newEmployeeArray: Employee[] = [];
        for (let i = 0; i < this.STARTING_STAFF; i++) {
            newEmployeeArray.push(this.createEmployee());
        }
        return newEmployeeArray;
    }

    private createEmployee(): Employee {
        const newEmployee: Employee = new Employee();

        const positionLevel: number = randomNumber(0,5);

        for (let j = 0; j < positionLevel; j++){
            newEmployee.promote();
        }

        this.historyLog.addNewEmployee(newEmployee);

        return newEmployee;
    }

    private onTimerInterval(): void {
        this.timerCount += 1;

        this.randomEvent();
    }

    private randomEvent(): void {
        const randomChange = randomNumber(1,100);
        switch(randomChange) {
            case 1: 
            case 5: 
            case 6:
            case 7:
            case 8:
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
    }

    private removeEmployee(quit?: boolean): Employee[] | void {
        if (this.employees.length <= 1) return;

        const randomEmployee: number = randomNumber(0, this.employees.length - 1);
        const employee: Employee = this.employees[randomEmployee];

        if (quit) {
            this.historyLog.quitEmployee(employee);
        } else {
            this.historyLog.fireEmployee(employee);
        }

        this.employees.splice(randomEmployee, 1);
        return this.employees;
    }

    private promoteEmployee(): void {
        const randomEmployee: number = randomNumber(0, this.employees.length - 1);
        const employee: Employee = this.employees[randomEmployee];
        employee.promote();
        this.historyLog.promoteEmployee(employee);
    }

    // private getRandomEmployee(): Employee {
    //     const randomEmployee: number = randomNumber(0, this.employees.length - 1);
    //     const employee: Employee = this.employees[randomEmployee];
    //     return employee
    // }

    // GETTERS AND SETTERS
    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getHistory(): string[] {
        return this.historyLog.getHistory();
    }

    public getAllEmployees(): Employee[] {
        return this.employees;
    }

    public getAllSalaries(): string[] {
        const salaryArray: string[] = [];

        let totalSalary: number = 0;

        for (let employee of this.employees) {
            const employeeSalary = employee.getSalary();
            const formattedSalary = currencyFormatter.format(employeeSalary, { code: 'USD'});
            salaryArray.push(formattedSalary);
            totalSalary += employeeSalary;
        }

        const formattedTotal = currencyFormatter.format(totalSalary, { code: 'USD' });
        salaryArray.push(formattedTotal);

        return salaryArray;
    }
}

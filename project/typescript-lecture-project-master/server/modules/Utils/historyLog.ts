import { Employee } from "../Employee";
import moment from 'moment';
const currencyFormatter = require('currency-formatter');

export class HistoryLog {

    private log: string[] = [];

    constructor() {}

    public addNewEmployee(employee: Employee) {
        const salary = currencyFormatter.format(employee.getSalary(), { code: 'USD'});
        const timeStamp = moment().format('lll');
        this.log.push(`${timeStamp} - ${employee.getFullName()} joined the team as a ${employee.getPosition()}, making ${salary} a year!`);
    }

    public promoteEmployee(employee: Employee) {
        const salary = currencyFormatter.format(employee.getSalary(), { code: 'USD'});
        const timeStamp = moment().format('lll');
        this.log.push(`${timeStamp} - ${employee.getFullName()} got PROMOTED, making ${salary}!`);
    }

    public fireEmployee(employee: Employee) {
        const timeStamp = moment().format('lll');
        this.log.push(`${timeStamp} - ${employee.getFullName()} was FIRED!`);
    }

    public quitEmployee(employee: Employee) {
        const timeStamp = moment().format('lll');
        this.log.push(`${timeStamp} - ${employee.getFullName()} quit! :(`);
    }

    public showHistory(): void {
        console.log(this.log);
    }

    public getHistory(): string[] {
        return this.log;
    }
}
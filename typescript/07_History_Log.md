# Typescript Series - Lecture 7

## The History Log
All sorts of things are going to happen in our fictional company. People will get hired, promoted, quit, and even get fired.
We want to see it all! To keep track of everything that is going on, we are going to create a class that functions as a 
record of history of events.

Inside the `Utils` folder, create a `HistoryLog.ts` file. Below is the code. After the code, we will talk about everything
we included.

`server/modules/Utils/HistoryLog.ts`

```typescript
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
```

Note that we pulled in two additional technologies. You will need to `npm i moment currency-formatter -s` in the terminal.

- __moment__ is a library that is really handy for helping us with Date and Time.

- __currency-formatter__ is great for handling the conversion of numbers to currency.

Also note that the way we imported `currency-formatter` helps us avoid some typing concerns that need not be the focus at the
moment. 

The History Log class consists of a couple simple things. First is the `log`, which simply is an array. We will push strings
into that array based on the methods we defined. Nothing in the constructor is needed. Then we set up all our methods to be
public in the application.

- addNewEmployee - Accepts and Employee class as an argument. Then it creates a variable that is a formatted version of that Employees salary. A time stamp is created for the current time. All that information is used to add a string into the log that records the time, employees name, position, and salary information.

- promoteEmployee - Accepts and Employee class as an argument. Stores the new, formatted salary and time. Then saves in the log the time, employee name, and salary information. (Although, it could also include new position)

- fireEmployee - Accepts the (old) Employee class as an argument. Records the time and then logs the information about the employee's firing from the company.

- quitEmployee - Accepts the (old) Employee class as an argument. Records the time and then logs the information about the employee'e quiting the company.

- showHistory - Spits out the entire log inside the console.

- getHistory - Returns the history log array.

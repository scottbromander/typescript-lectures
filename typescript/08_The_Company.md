# Typescript Series - Lecture 8

## The Company

Currently, you `Company.ts` file should look something like this:

```typescript
import { Employee } from "./Employee";

export class Company {
  private timerCount: number;
  private timer: Object = {};
  private employees: Employee[];
  
  private readonly INTERVAL_TICK: number = .005 * 1000;
  private readonly STARTING_STAFF: number = 10;

  constructor() {
      this.timerCount = 0;
      this.employees = [];

      this.init();
  }

  private init(): void {
      while(this.employees.length < this.NUM_OF_EMPLOYEES){
          this.createEmployee();
      }

      this.timer = setInterval(this.onTimerInterval.bind(this), this.INTERVAL_TICK);
  }

  private onTimerInterval(): void {
      this.randomEvent();
  }

  private randomEvent(): void {

  }

  private createEmployee(): Employee {
      const newEmployee = new Employee('Scott', 'Bromander', 10000000);
      this.employees.push(newEmployee);
      return newEmployee;
  }
}
```

Now that we have the `Employee` Class and other files built out, we can really start to build up the functionality up inside the `Company` Class.

Let's start out by bringing in our new Employee class and tracking our employees in an array, then also creating an instance of the history log to keep track of what is happening at our company. After we delcar our `timerCount`, `timer`, and `name` for our company, let's add our History log and Employee array.

```typescript
    private timerCount: number;
    private timer: Object = {};
    private name: string;

    private historyLog: HistoryLog = new HistoryLog();

    private employees: Employee[] = [];

```

We set the `historyLog` to private and create a new instance of it. Notice also that we type it to the `HistoryLog` class. This should trigger an import at the top that looks like this, `import { HistoryLog } from './Utils/HistoryLog';`. 

Then, for the employees, we create a private array that is set to a new empty array. Notice how arrays are typed as well. You start with the class, then add the matching `[]` after the class name. This means that this array is an array of `Employee` instances. That should trigger `import { Employee } from './Employee';`

## Hiring our initial staff
When we kick off the application, we do not want to wait for employee pool to build up through random events. Instead, we are going to hire our initial staff. Rather than do that in the `init` method, we are instead going to offload this to another method. This method will return an array of employees that we can then set our initial employee array to. Add the following method below the `init` method.

```typescript
private hireInitialStaff(): Employee[] {
    const newEmployeeArray: Employee[] = [];
    for (let i = 0; i < this.STARTING_STAFF; i++) {
        newEmployeeArray.push(this.createEmployee());
    }
    return newEmployeeArray;
}
```

As stated above. This method returns an employee array. We kick off the method by declaring a new Employee array. Then, we create a loop that fires off the number of times we have set for our constant `STARTING_STAFF`. This will then push the return of the `createEmployee` method into our new array. Once the loop is done, we return the new array.

Now head back to the `init` method and delete:

```typescript
while(this.employees.length < this.NUM_OF_EMPLOYEES){
    this.createEmployee();
}
```

Instead, we are going to set the class level property, `employees` to be equal to the return of the `hireInitialStaff` method. It should look something like this:

```typescript
private init(): void {
    this.employees = this.hireInitialStaff();
    this.timer = setInterval(this.onTimerInterval.bind(this), this.INTERVAL_TICK);
}
```

So `init` calls `hireInitialStaff`. Now, let's turn our attention to `createEmployee`. To start, let's dump the following lines of code:

```typescript
const newEmployee = new Employee('Scott', 'Bromander', 10000000);
this.employees.push(newEmployee);
```

If you remember from our `Employee` class, we set up some default values if arguments were not provided. We can leverage that to keep things as random as possible. Meaning that when we create a new employee, they will be given a random first and last name, as well as a random salary within a range. However, their position is fixed. When we start the company, we do not want to have a bunch of Associates. We want some depth within the company. So when we create an employee, we will assign them a random position as well. We could just as easily do this in the Employee class, but if we wanted to do some control around the types of positions we have within the company, we would want to have this assignment happen outside the class.

Upgrade you `createEmployee` method to look like this:

```typescript
private createEmployee(): Employee {
    const newEmployee: Employee = new Employee();

    const positionLevel: number = randomNumber(0,5);

    for (let i = 0; i < positionLevel; i++){
        newEmployee.promote();
    }

    return newEmployee;
}
```

This creates the employee, name and salary assignment will happen randomly within the class. For the position, we pick a random number between 0 (no promotion) to 5 (Director Level). If the position level has a value, it loops through and calls the `promote` method of the employee class. This also takes care of the raises for the employee as well. This way, as we add depth in our staffing positions, we also have depth in the salary ranges. 

One more thing to add inside this method! Let's leverage our `historyLog` to record the event! Add this line before the method returns, `this.historyLog.addNewEmployee(newEmployee);`. This calls the `addNewEmployee` method of the history log, which accepts the employee and grabs the needed details to log the event.

## Random Events

Remember the `onIntervalTimer` method? Let's hook into that so we can have our company change over time! Inside that method, we will do two things. We will add to a count, then we will point to a random method that causes a random event to happen. Problem though... our `onIntervalTimer` method has a context we would not expect. Back when we created the timer, we used the `setInterval` method to fire off the `onIntervalTimer` method. This context is bound to the timer itself, rather the context of the class. So we need to fix that. Back in our `init` method, when we created the timer, we need to add `.bind(this)` to the `onTimerInterval` method. Passing `this` into the bind method binds the class context to the method which we are calling. 

It should look like this: 

```typescript
public init(): void {
    this.hireInitialStaff();
    this.timer = setInterval(this.onTimerInterval.bind(this), this.UPDATE_INTERVAL);
}
```

Now when we upgrade the `onTimerInterval` method, we can confidently use `this` and reference the class and not the timer.

```typescript
private onTimerInterval() {
    this.timerCount++;

    this.randomEvent();
}
```

Now we are calling the `randomEvent` method. Let's plug in the code and talk about it on the other side:

```typescript
private randomEvent(): void {
    const randomChance:number = randomNumber(1,100);

    switch(randomChance){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            this.employees.push(this.createEmployee());
            break;
        case 7:
            this.removeEmployee(false);
            break;
        case 8:
            this.promoteEmployee();
            break;
        case 9:
            this.removeEmployee(true);
            break;
        default:
            break;
    }
}
```

For the most part, this is a pretty straight forward method. We are create a random number, then run a switch case against it to have a random event happen. The interior method calls point to methods we have not created yet, but we will get that addressed in a moment. The one thing that might be strange in this switch case, is that we are stacking cases. Basically, being that each random number represents 1% chance of occuring, we are boosting the chance that a new employee would be created. The way it breaks down, is that there is a 6% chance a new employee will join, 2% one will leave, either through getting fired or quitting, then 1% chance of someone getting promoted. 

Let's break down each of the random chance methods:

### Promote Employee

```typescript
private promoteEmployee(): void {
    const randomEmployeeNumber: number = randomNumber(0, this.employees.length - 1);
    const randomEmployee: Employee = this.employees[randomEmployeeNumber];
    randomEmployee.promote();
    this.historyLog.employeePromote(randomEmployee);
}
```

In this method, we select a random employee, then run their promote method. Then, we make sure to capture that in the log by calling the log's `employeePromote` method.

### Remove Employee

```typescript
private removeEmployee(quit?: boolean): void {
    if(this.employees.length <= 1) return;

    const randomEmployeeNumber: number = randomNumber(0, this.employees.length - 1);
    const randomEmployee: Employee = this.employees[randomEmployeeNumber];

    if (quit) {
        this.historyLog.employeeQuit(randomEmployee);
    } else {
        this.historyLog.employeeFired(randomEmployee);
    }

    this.employees.splice(randomEmployeeNumber, 1);
}
```

This method removes an employee. Either via a quit, or a fire. In both cases, we remove a random employee, really the only difference is how we track it in the log. The method accepts a boolean value, which is optional. There is a quick 'exit early' check to make sure there is at least one employee in our employee list. Then it picks a random employee, then checks to see if they are quitting or getting fired. Logs accordingly. Then splices that employee out of the array.

---

Great! To wrap up, your class should look something like this!

```typescript
export class Company {

  // Properties
  private timer: Object = {};
  private timerCount: number = 0;
  private employees: Employee[] = [];
  private historyLog: HistoryLog = new HistoryLog();

  private readonly NUM_OF_EMPLOYEES:number = 10;
  private readonly UPDATE_INTERVAL: number = 1000; // (in milliseconds)

  constructor() {
      this.init();
  }

  public init(): void {
      this.hireInitialStaff();
      this.timer = setInterval(this.onTimerInterval.bind(this), this.UPDATE_INTERVAL);
  }

  // RANDOM EVENTS SECTION
  private onTimerInterval() {
      this.timerCount++;

      this.randomEvent();
  }

  private randomEvent(): void {
      const randomChance:number = randomNumber(1,100);

      switch(randomChance){
          case 1 || 2 || 3 || 4 || 5 || 6:
              this.employees.push(this.createEmployee());
              break;
          case 7:
              this.removeEmployee(false);
              break;
          case 8:
              this.promoteEmployee();
              break;
          case 9:
              this.removeEmployee(true);
              break;
          default:
              break;
      }
  }

  private promoteEmployee(): void {
      const randomEmployeeNumber: number = randomNumber(0, this.employees.length - 1);
      const randomEmployee: Employee = this.employees[randomEmployeeNumber];
      randomEmployee.promote();
      this.historyLog.employeePromote(randomEmployee);
  }

  private removeEmployee(quit?: boolean): void {
      if(this.employees.length <= 1) return;

      const randomEmployeeNumber: number = randomNumber(0, this.employees.length - 1);
      const randomEmployee: Employee = this.employees[randomEmployeeNumber];

      if (quit) {
          this.historyLog.employeeQuit(randomEmployee);
      } else {
          this.historyLog.employeeFired(randomEmployee);
      }

      this.employees.splice(randomEmployeeNumber, 1);
  }

  // STAFF CREATION
  private hireInitialStaff(): void {
      for(let i = 0; i < this.NUM_OF_EMPLOYEES; i++){
          this.employees.push(this.createEmployee());
      }
  }

  public createEmployee(): Employee {
      const newEmployee: Employee = new Employee();
      const randomPromotion = randomNumber(0,5);
      for(let i = 0; i < randomPromotion; i++){
          newEmployee.promote();
      }
      this.historyLog.addNewEmployee(newEmployee);
      return newEmployee;
  }
}
```

Next, we will wrap up by creating endpoints and getters!

# Typescript Series - Lecture 6
## Interfaces

We have employees now, but what if we want to expand our company? What if we wanted to create fake clients? What types of 
properties and methods might we include? Would inheritance be the best option? Perhaps we create a `Person` parent class that
both the clients and employees extend. Sometimes this is a good option, but not always. 

Let's say we wanted to run a report that discussed everyone who was in our building of the company that day. We wanted to get 
the names of all clients and employees for that day. Perhaps we run a `getFirstName` method on all `Person` classes. This would
work fine, until we run into a scenario where a client perhaps did not provide a name. We could then perhaps make an upgrade
to the `getFirstName` within the client class thanks to Polymorphism. So then we go ahead and write some costume logic. Cool, 
we have then solved that problem, but we run into a new one. What about 3rd party contract workers? They are neither really
employee nor client. Ok... so we extend the `Person` class again, and so on. What about people who walked into the building
but who did not convert to a client? Oh man... this is getting a little taxing to keep track of. So maybe we don't inherit 
from the `Person` class? Urgh... decisions.

All we wanted to do was get the names. What if we had a way to make sure we had an answer to when `getFirstName` is called
on every possible class, but we didn't necessarily need to have all the details figured out right away? We could figure it out
as we go? That would be neat.

Luckily, we do!

`Interfaces` are a tool to make sure we enforce the creation of certain methods on a class. Basically, we define an interface
and say 'Who ever uses this interface NEEDS to include certain methods in that class.' This is a handy tool for if you have a 
bunch of different classes that need to call a method, but the methods may differ a bit from class to class. While our company,
client, employee, 3rd party workers, and so on, example is a little contrived, another example might be a `render` method. If 
we created an interface that demanded that the class create a `render` method, it would be handy to make sure we write one, 
without actually defining HOW the thing was rendered. We just want to developer to know it has to be rendered!

Let's write an interface for persons in our company. Inside the `modules` folder, create an `interfaces` folder. Inside there, 
create an `IPerson.ts` file. It is considered convetion to include `I` in front of the interface name. So it becomes `I` + `Person`.

Drop the following code into the file:

```typescript
interface IPerson {
    getFirstName(): string,
    getLastName(): string,
    getFullName(): string,
}
```

We start with the `interface` keyword. Then we include the name of the interface. Inside the code block, we simply define
the name of the methods we are looking for as well as the return type. In this case, if we use this interface in a class, that 
class needs to have all three of these methods or the code will error. This will ensure that when we write the class, it has 
these methods.

Back in the `Employee.ts` file, let's implement the interface. In the class declaration line, we include the 'implement' 
keyword, then the name of the interface we want to implement. That line looks something like this: `export class Employee implements IPerson {`

Because we have already included those methods, we do not get an error. But go ahead and delete the `getFullName` method. You 
will notice that the IDE freaks out at the class level. You get an error letting you know that you implemented `IPerson` but
that it is missing the `getFullName` property. 

In a nutshell, Interfaces are an awesome way to make sure the class has certain methods without actually defining what those
methods look like. This is super handy if your class is going to slide into a system where you know certain methods are going
to be called on the class. 

That wraps up our `Employee` class! Here is the full class:

```typescript
import { Position } from "./Enums/Position";
import * as data from '../modules/Data/names.json';
import { randomNumber } from "./Utils/randomNumber";
import { MeritIncrease } from "./Enums/MeritIncrease";

export class Employee implements IPerson {

    private firstName: string;
    private lastName: string;
    private salary: number;
    private position: Position;

    constructor(firstName?: string, lastName?: string, salary?: number, position?: Position) {

        this.firstName = firstName ? firstName : this.generateFirstName();
        this.lastName = lastName ? lastName : this.generateLastName();
        this.salary = salary ? salary : randomNumber(40000, 60000);
        this.position = position ? position : Position.ASSOCIATE;
    }

    private generateFirstName(): string {
        return data.first_names[randomNumber(0, data.first_names.length - 1)];
    }

    private generateLastName(): string {
        return data.last_names[randomNumber(0, data.last_names.length - 1)];
    }

    public promote(): void {
        switch(this.position) {
            case Position.ASSOCIATE:
                this.position = Position.ANALYST;
                this.salary = this.meritIncrease(MeritIncrease.ANALYST);
                break;
            case Position.ANALYST:
                this.position = Position.SENIOR_ANALYST;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_ANALYST);
                break;
            case Position.SENIOR_ANALYST:
                this.position = Position.MANAGER;
                this.salary = this.meritIncrease(MeritIncrease.MANAGER);
                break;
            case Position.MANAGER:
                this.position = Position.SENIOR_MANAGER;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_MANAGER);
                break;
            case Position.SENIOR_MANAGER:
                this.position = Position.DIRECTOR;
                this.salary = this.meritIncrease(MeritIncrease.DIRECTOR);
                break;
            case Position.DIRECTOR:
                this.position = Position.VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.VICE_PRESIDENT);
                break;
            case Position.VICE_PRESIDENT:
                this.position = Position.SENIOR_VICE_PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.SENIOR_VICE_PRESIDENT);
                break;
            case Position.SENIOR_VICE_PRESIDENT:
                this.position = Position.PRESIDENT;
                this.salary = this.meritIncrease(MeritIncrease.PRESIDENT);
                break;
            default:
                break;
        }
    }

    private meritIncrease(percentage: number): number {
        //EXAMPLE:   50000 * (1 * 0.05) = 52500
        return Math.floor(this.salary * (1 + percentage));
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getSalary(): number {
        return this.salary;
    }

    public setSalary(salary: number): void {
        this.salary = salary;
    }

    public getPosition(): Position {
        return this.position;
    }

    public setPosition(position: Position): void {
        this.position = position;
    }

    public getFullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
```

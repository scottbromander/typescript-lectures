# Typescript Series - Lecture 4
## Optional Values

When we create an employee, we COULD enter employee by employee, but that would be a little bit of a pain for what we are 
trying to do. Our application is not meant for real life, its meant more to create a fictional company. If in our fictional
company, we wanted 100 employees, it would be a massive pain in the rear, to instance 100 employees. We would have to come
up with names, salaries, and positions for all those people. Frankly, thats too hard to be that creative. 

So one of the things we are going to set out to do, is build a way for each employee created to have a random name, position,
and so on. To accomplish this, we are going to build out a JSON file that has random first and last names. Then we will use
that list to generate random names.

Create a new folder Data, inside that Modules folder, so `server/modules/Data`. Inside there, create a `names.json`, paste the 
following code:

`names.json`
```json
{
    "first_names" : [
        "Alexander",
        "Callum",
        "Charles",
        "Charlie",
        "Connor",
        "Damian",
        "Daniel",
        "David",
        "Ethan",
        "George",
        "Harry",
        "Jack",
        "Jacob",
        "Jake",
        "James",
        "Joe",
        "John",
        "Joseph",
        "Kyle",
        "Liam",
        "Mason",
        "Michael",
        "Noah",
        "Oliver",
        "Oscar",
        "Reece",
        "Rhys",
        "Richard",
        "Robert",
        "Thomas",
        "William",
        "Abigail",
        "Amelia",
        "Ava",
        "Barbara",
        "Bethany",
        "Charlotte",
        "Elizabeth",
        "Emily",
        "Emma",
        "Isabella",
        "Isla",
        "Jennifer",
        "Jessica",
        "Joanne",
        "Lauren",
        "Lily",
        "Linda",
        "Madison",
        "Margaret",
        "Mary",
        "Megan",
        "Mia",
        "Michelle",
        "Olivia",
        "Patricia",
        "Poppy",
        "Samantha",
        "Sarah",
        "Sophia",
        "Susan",
        "Tracy",
        "Victoria"
    ],
    "last_names" : [
        "Anderson",
        "Brown",
        "Byrne",
        "Davies",
        "Davis",
        "Evans",
        "Gagnon",
        "Garcia",
        "Gelbero",
        "Johnson",
        "Jones",
        "Lam",
        "Lee",
        "Li",
        "Martin",
        "Miller",
        "Morton",
        "Murphy",
        "O'Brien",
        "O'Connor",
        "O'Kelly",
        "O'Neill",
        "O'Ryan",
        "O'Sullivan",
        "Roberts",
        "Rodriguez",
        "Roy",
        "Singh",
        "Smith",
        "Taylor",
        "Thomas",
        "Tremblay",
        "Walsh",
        "Wang",
        "White",
        "Williams",
        "Wilson"
    ]
}
```

There you have it. Loads of names to choose from! Notice that there are two arrays, `first_name` and `last_name`. 

We have one small thing we need to address in the `tsconfig.json` file however. Stock, Typescript does not allow `json`
imports the same way that Node core does. So we need to turn that on. Inside the tsconfig, add this code:

```
{
  "compilerOptions": {
    /* Basic Options */
    /* Experimental Options */
    ...
    ...
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    "resolveJsonModule": true /* ADD THIS LINE!!!!*/
  }
}
```

As the name implies, this allows JSON modules to solve inside typescript builds. This will come in handy for building our 
random names. But we need make another module to help us with grabbing random numbers. If you've ever worked with me, you 
know that almost every project I create has this little module. So lets build a new folder inside modules, `Utils`. So 
`server/modules/Utils/` is the path for that folder. Then inside there, create a `randomNumber.ts` file.

Drop this code into that file:

`randomNumber.ts`
```typescript
export function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (1 + max - min) + min);
}
```

Its pretty simple, give it a min number and a max number as an argument, and it spits out a random int inbetween those 
ranges. Great! Now that we have that, we can make some random names for our employees. In the process, we will talk about
optional values in Typescript.

Head back over to the `Employee.ts` file.

Let's make some upgrades:

```typescript
import { Position } from "./Enums/Position";
import * as data from '../modules/Data/names.json';
import { randomNumber } from "./Utils/randomNumber";
import { MeritIncrease } from "./Enums/MeritIncrease";

export class Employee {

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
    
    ...
}
```

Ok! Lots new going on here. First, lets look at our constructor, notice the firstName. Now it has a `?` after it. 
What that does, it is turns that into an optional parameter. Meaning that we now have the choice to include a 
`firstName` or not to. We gave ALL of the parameters the option. Then down inside the contructor function itself, 
we deal with whter or not a value has been provided. We use the ternary operator of course to help us with that.

`this.firstName = firstName ? firstName : this.generateFirstName();`

Basically, it English, it reads like this: "Set the first name to: If the first name provided as an argument? Yes! Great, 
set it to that. No? Set it to the result of the `generateFirstName` function". 

Cool. So if we do NOT give it a provided name, it heads down to the new function we provided. Let's look at that:

```typescript
private generateFirstName(): string {
        return data.first_names[randomNumber(0, data.first_names.length - 1)];
}
```

So this has a string return type and is a `private` method. Which means that only the `Employee.ts` file can call that method.
Remember, a method is a function that belongs to a Class. Then, inside the method, it returns a value. This value is gotten
from the data module. Which we imported with `import * as data from '../modules/Data/names.json';`

So all of the JSON data is called simply `data`. Inside of that, we have a `first_name` key, that is an array with all the 
possible first names. We use bracket notation because it is an array, and as a value, we give it a function. Its that
handy `randomNumber` function! Which takes in 0, which is the first possible name, then as a max, we give it the length
of the entire `first_name` array length, minus 1. So in the end, it randomly accesses one of the first names in that JSON
data list.

The same is true for last names too! The salary is randomly selected if one is not provided. Then with the position, we give
it the first possible enum. Everyone starts at the ground level and has to work their way up!

## Promoting Employees
Now that we have a cool way to create random employee names, let's wrap up the Employee Class. We are going to need a method to promote our employees over time. When an employee gets promoted, we are going to honor them with a raise and a new title!

Because the promotion will be done from another class, we are going to create a `public` method called `promote`. When an employee is promoted, they will move up the ladder and secure a raise based on the new role they are aquiring.

Copy the below code under your `generateLastName` method:

```typescript
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
```

As you can see, this method checks the current position of the employee, then moves them to the next level. Then it runs another function we have yet to create called `meritIncrease` that accepts an enum for the new position. 

Under this new method, create anotehr new method called `meritIncrease`:

```typescript
private meritIncrease(percentage: number): number {
    return Math.floor(this.salary * (1 + percentage));
}
```

This returns the current salary times 1 plus whatever the raise is. For example: `50000 * (1 * 0.05) = 52500`. What's great, is all of these values are abstracted in a enum file so that you can easily reference the values and make adjustments in a singular place. 

To wrap up the Employee Class, let's next chat about Getters and Setters.

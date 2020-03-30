# Typescript Series - Lecture 3

## Enums
Enums are a set variable type! It helps us lock down what a variable can be with a set of fixed values. A basic example of an enum might be something like `Employment Status`, being set to a few values such as `'Full-time', 'Part-time', 'Unemployed'`. But in practice, they would reference the Enum structure itself, rather than the string value. This helps ensure consistency across the application. 

For example, accessing an Enum like mentioned above might look like: `EmploymentStatus.FULL_TIME`, which would point to the `'Full-time'` string. But accessing it this way would ensure that we do not write it the incorrect way, such as `'full-time'` or `'Full Time'`. 

Create the `server/modules/Enums` folder and add the following files:

`MeritIncrease.ts`
```typescript
export enum MeritIncrease {
    ASSOCIATE = 0,
    ANALYST = 0.05,
    SENIOR_ANALYST = 0.05,
    MANAGER = 0.07,
    SENIOR_MANAGER = 0.07,
    DIRECTOR = 0.1,
    VICE_PRESIDENT = 0.1,
    SENIOR_VICE_PRESIDENT = 0.15,
    PRESIDENT = 0.5
}
```

and

`Position.ts`
```typescript
export enum Position {
    ASSOCIATE = 'Associate',
    ANALYST = 'Analyst',
    SENIOR_ANALYST = 'Senior Analyst',
    MANAGER = 'Manager',
    SENIOR_MANAGER = 'Senior Manager',
    DIRECTOR = 'Director',
    VICE_PRESIDENT = 'Vice President',
    SENIOR_VICE_PRESIDENT = 'Senior Vice President',
    PRESIDENT = 'President'
}
```

Now in our application, we can import the `Position` and `MeritIncrease` enums and point to theit possible values. This will help us in creating an Employee, as we can set the only possible positions they can hold with that new Position enum!

Back in the `Employee.ts`, lets update to include position when we create the employee. 

```typescript
export class Employee {

  private firstName: string;
  private lastName: string;
  private salary: number;
  private position: Position;

  consturctor(firstName: string, lastName: string, salary: number, position: position) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    this.position = position;
  }
}
```

Note that in the property declaration, we included `private position: Position;`. This means that that property, can ONLY be one of the matching enum values. So when we are creating the employee, we would need to include something like this:
`const newEmployee = new Employee('Scott', 'Bromander', 10000000, Position.ANALYST);`

Worth noting here, is that 'under the hood', the real value of `Position.ANALYST` is simply `'Analyst'`. But we know FOR CERTAIN that it is that value, because we locked it down with an enum! The truth is, we never actually see the string version of the enum in our code. In the end, the `key` of the enum ends up being the important, consistent thing, rather than the value. As we will see later though, we can use enums values to help us in other ways, such as calculations, which we will see with that `MeritIncrease` enum we created earlier.

Let's continue building out our employee with adding a Name generator and some default values!

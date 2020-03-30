# Typescript Series - Lecture 5
## Getters and Setters

When working with a strongly typed, class based language, the `encapsulation` OOP principle becomes important to consider.
With encapsulation, you become concerned about what is `private` and `public` in your class. A good rule to follow is to lock
everything down to a `private` and 'upgrade' to `public` if needed. This includes properties. In fact, **ALL** properties in
a class should be marked `private`. If you want another class to access these properties, you create a method that `GETS` the
value for you. If you need to set a property, you would create a method to `SET` a value. 

By having these marked private, you avoid any accidents in that might occur in access a property directly without considering 
the side effects. A great example would be a `Bank Account` class. You may have a `balance` property in there. If you were 
able to subtract the balance directly from another class, you may accidentally forget to consider whether or not an 
overdraft is allowed. And if it is, to add the penalty. By creating a SET method to adjust the balance and locking down the 
balance as a `private` property, you can prevent such an error. Other parts of the application would then need to use that 
SET method on the balance, preventing the direct access to balance. From there, you have a central point to control how
setting the balance works, whats allowed, and so on.

Some languages actually have specific conventions for this practice, but in Typescript, its technically completely optional. 
We are going to go ahead and follow best practice however. Our `firstName`, `lastName`, `salary`, and `position` are actually
already marked private, so the only work we need to do is to create methods to get each of those values. 

Worth noting, is that there is a SUPER handy Extention for this for VSCode called [TypeScript's Getters and Setters Object Oriented Programming Style](https://marketplace.visualstudio.com/items?itemName=Wilson-Godoi.wg-getters-and-setters).

With that extention, you can highlight these lines of code:

```typescript
    private firstName: string;
    private lastName: string;
    private salary: number;
    private position: Position;
```

Then using the command menu (Command + Shift + P), type `generate getters and setters`, then select that option.

This code will be produced:

```typescript
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

```

Its considered best practice to move all getters and setters to the bottom of your class. Also, remove any of the methods you 
do not need. For now, you could remove all setters. 

As you can see, getters and setters simply retrieve and return values, or update the values based on function arguments. 

Getters and setters are all over programming, in fact you have probably seen them before. Here are a couple blasts from the 
past you may be familiar with:

jQuery:
`$('#element').data('cat');`

Node:
`app.get('PORT');`

You can of course make custom getters and setters as well. In fact, let's create one to retrieve the employee's full name! 
At the bottom of the getters and setters add this getter:

```typescript
public getFullName(): string {
    return this.firstName + " " + this.lastName;
}
```

Perfect! Our employee is almost ready for work. We need to make one final stop before we wrap them up.

# Typescript Series - Lecture 2

## Classes, Access Modifiers, and Types

### The Company
To help us tackle some of the concepts of Typescript, Strong Typing, and OOP concepts, we are going to build a server side application that creates a fictional company. More specifically, the application will hire the initial staff, then over time, promote them, fire them, while also allowing our staff to quit. The application will have no Front-End, but we will create end points to look at the data, that way we can see our company change over time. 

To see a working version, you can see the living version of this app on Heroku. Below are various endpoints to see how our living company is doing:
- [https://nameless-atoll-19839.herokuapp.com/api/company/log](https://nameless-atoll-19839.herokuapp.com/api/company/log) - Shows you the complete log of events that have happened at the company.
- [https://nameless-atoll-19839.herokuapp.com/api/company/employees](https://nameless-atoll-19839.herokuapp.com/api/company/employees) - Shows you the employees currently working at the company.
- [https://nameless-atoll-19839.herokuapp.com/api/company/totalsalary](https://nameless-atoll-19839.herokuapp.com/api/company/totalsalary) - Shows you the current salary of all employees added together.
- [https://nameless-atoll-19839.herokuapp.com/api/company/allsalary](https://nameless-atoll-19839.herokuapp.com/api/company/allsalary) - Shows you all the individual salaries as well as a total salary of the company.
- [https://nameless-atoll-19839.herokuapp.com/api/company/positions](https://nameless-atoll-19839.herokuapp.com/api/company/positions) - Shows you the current positions that work within the company.
- [https://nameless-atoll-19839.herokuapp.com/api/company/allnames](https://nameless-atoll-19839.herokuapp.com/api/company/allnames) - Shows you the names of all the people working at the company.

Note that the Company has the opportity to change through a random event every 15 seconds. Check back from time to time to see how the company is doing!

---
### The Company Class
Our company is a living, breathing organism that lives independant of the notion of the internet. Because of this, we are going to abstract out the company into its own class. Then we are going to bundle up that class and make it so that our `App.ts` file can load it up.

Create a new file called `company.ts`. Lets go ahead and build out the beginnings of our class.

```typescript
export class Company {

  constructor() {
  
  }
}
```

At this point, it would be good to talk about what the actual application is going to do. 

The Company is really all about its employees. When an employee is created, they will have a first name, last name, position, and salary. When the application loads for the first time, we will create a staff of 10 employees to start. Then over time, additional employees can join, get promoted, get fired, or even quit. 

To start, we will create an `init` method that will kick off the application. Typically, the `constructor` is reserved for specifically assigning internal properties. Decoupling the `constructor` away from the logic of starting the application via an `init`, allows the developer to be specific about when an application should start. Sometimes, you may want to load the application, but not actually start it until a certain event happens. In our case, we will let the application start when it is instantiated. 

Let's update our code. 

```typescript
export class Company {

  constructor() {
     this.init();
  }
  
  private init() {
  
  }
}
```

Note the `private` before `init`. This is what is referred to as an 'Access Modifer'. They come in a couple flavors, but for starters, let's chat about `private` versus `public`. 

Private - Allows us to access properties and methods from only inside the class. Meaning that if another class or file imports this class, it will not be able to reach inside the class and call that method or access that property. Which is why we have...
Public - Public access modifers allow us to access methods or properties from other classes or files. 

Generally speaking, you should strive to make every property `private`. Then, you will have a mix of `public` and `private` methods. So how do you get properties you ask? You create `getters` and `setters`, but we will cover that shortly. 

Think of car. `startCar(key)` might be a method we could run on the car. We give the `startCar` method a `key` argument. Within the method, it might fire off a whole sequence of methods that access various properties. Because of the way the car is designed, we keep the average car use unaware of what is happening (literally) 'under the hood'. But the result of running that method, is that the car starts. We would never want to make it so a regular user could get at the individual components within the car itself. For example, the average user should never be able to actually call the `firePiston` method or access the `sparkPlug` property. Those are examples of `private` properties and methods. `startCar(key)` is something we allow the user to interface with, so that is a `public` method.

Most of our Company application will be `private`, but we will create `public` methods later so that other classes and files can access the data nestled inside our Company.

Specifically `init()`, is something that only Company itself should be able to use. 

---
### Creating our Event Loop 
One of the cool features of our server application, is that it will change the state over time. To do that, we will employ an interval that fires off a method to update the data based on random chance. To accomplish this, we will create two new methods inside our class. One will be the method to handle the interval, and the other will be a method that helps us with figuring out which random event to initiate. 

We will use init to create our interval timer. That will fire off the interval method, which will then fire off the random event method. Abstracting things out this way will help us with organizing our code down the road. Setting up the `interval` is as simple as using JavaScript's `setInterval` method, with one catch. 

#### Lexical Binding
The challenge we have, is that when we point to a method from inside the `setInterval` method, we lose the scope of the class from inside the method of the call inside the interval. Which means that we cannot access properties of the `Company` class inside the method we call using `setInterval`. We can address this by using JavaScripts `.bind` method, chained after the method we call inside the set interval. We pass it `this` which points to the `Company` class itself. That way, when we get inside our interval method, `this` becomes the Company class, rather than the scope of the method itself.

```typescript
private timerCount: number;
private timer: Object = {};

constructor() {
    this.timerCount = 0;

    this.init();
}

private init(): void {
    this.timer = setInterval(this.onTimerInterval.bind(this), 5000);
}

private onTimerInterval(): void {
    this.randomEvent();
}

private randomEvent(): void {

}
```

So breaking down the above code:
   - We created a `timerCount` that was set to a private member of the Company class. We will use this as a simple counter. Every time our `onTimerInterval` 'ticks', we will add `1` to that counter. We could use this for a variety of things, but for now, it simply will tell us how often our application ran `onTimerInterval`. Notice also that we typed that member to a `number` type. 
   - Next up, we created a `timer` member. We set this to an `Object` type and then assign it to an empty anonymous object. Then, in the `init` method, we set that equal to whatever the `setInterval()` method evaluates to. This will allow the timer to kick off, but then we will have access to it later if we need it!
   - The `constructor` method fires off the `init` method. As I said before, we have the option to fire off `init` whenever we want, and we CHOOSE to fire it off when the application loads, but we don't have to. The beauty of having the `constructor` and the application start decoupled, is that we have choice. In case the scenario changes in the future where we would not it to start with the `constructor`. 
   - `init` then uses the `timer` member and sets it equal to the result of the `setInterval` method. This method takes in two things: What method should fire off on the interval, and the milliseconds count for each time the method from the first argument will run. Note that currently this is a "Magic Number", meaning that its a number without any real explination. We would recommend making another class member, calling it and setting it to: `private readonly INTERVAL_TICK: number = 5 * 1000;`. Note that here we used `readonly` after the `private`. These are constants in Typescript. It is set to a `number`, then set to the result of `5 * 1000`. This simply allows us to write `5` for 5 seconds, then multiplying it by 1000 converts it to milliseconds.

### Creating our initial Employees
So we have created a way an event loop to help us eventually with random changes in our Company. In doing so, we got the chance to talk about class structure, intervals, `readonly` members, and binding. Now its time to turn our attention to creating employees to work at our fictional company!

Before we do our work inside the Company class, let's go ahead and create an `Employee` class. Inside our `modules` folder, next to the `company.ts`, go ahead and create a new file called `employee.ts`. For now, we are going to start pretty basic. Our employees will have a `firstName`, `lastName`, and `salary`. In doing so, we will accept those as arguments, defining their types within the constructor arguments.

```typescript
export class Employee {

  private firstName: string;
  private lastName: string;
  private salary: number;

  consturctor(firstName: string, lastName: string, salary: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
  }
}
```

Great! This will be enough to get started. One thing to note in the above code though however. We set the `firstName`, `lastName`, and `salary` with a `private` access modifer. This means, that currently we have no actual way to access that information outside of the `Employee` class. Which currently is only assigning that information from the constructor. So literally no way to get at that info. We will address that later. For now, we have the ability to create an `Employee` and assign some basic information.

Let's head back over to the `Company` file.

In the `Company` class, let's create a new method called `createEmployee`. Inside that method, create a new variable called `newEmployee` and set it equal to a `new Employee`. For the arguments, just toss in your first and last name, then however much money you would like to make. We will come back and build this out later to be random. Then below that, let's push our employees into a new private member array so that we can track, look at, and modify our employees later. Finally, return the new employee.

```typescript
private employees: Employee[];

constructor() {
  this.timerCount = 0;
  this.employees = [];
  
  this.init();
}

private createEmployee(): Employee {
  const newEmployee = new Employee('Scott', 'Bromander', 10000000);
  this.employees.push(newEmployee);
  return newEmployee;
}
```

Notice that we typed the new `employees` member to an `Employee[]`. This means that we expect this to be an array of `Employees`. Inside the constructor, we set that to an empty array. Note that you will need to initialize values for class members either at the declaration, or in the `constructor`. Typescript makes you be explicite about what those values are. Also, if you have not done so, set the `timerCount` to `0`. Now, when we use the `createEmployee` method, it returns an instance of the `Employee` class. When we initially load the application, we want to build out our initial staff. We will use a loop within the `init` method to do this. 

Let's upgrade our `init` method to create our initial staff.

```typescript
private init(): void {
    while(this.employees.length < this.NUM_OF_EMPLOYEES){
        this.createEmployee();
    }

    this.timer = setInterval(this.onTimerInterval.bind(this), this.INTERVAL_TICK);
}
```

Once again, `this.NUM_OF_EMPLOYEES` COULD be a magic number, in this case, I set it above to `private readonly NUM_OF_EMPLOYEES: number = 10;`. You could just as easily use 10 instead. We use a while loop to loop until the `this.employees` array is 10 long. Meaning we check the length against our static number and create employees as long as its under 10. The `createEmployee()` method creates employees and then pushes them into the `this.employees` array until the length of that array satisfies the while loop.

If we wanted to check things out and see how it was going, we could simply log out the array after the `while` loop happens! Feel free to build the project and do so!

Next up, Enums!

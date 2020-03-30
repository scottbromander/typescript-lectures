## The Company

[Lectures](https://github.com/scottbromander/typescript-lectures/tree/master/typescript)

To help us tackle some of the concepts of Typescript, Strong Typing, and OOP concepts, we are going to build a server side application that creates a fictional company. More specifically, the application will hire the initial staff, then over time, promote them, fire them, while also allowing our staff to quit. The application will have no Front-End, but we will create end points to look at the data, that way we can see our company change over time.

To see a working version, you can see the living version of this app on Heroku. Below are various endpoints to see how our living company is doing:

  - https://nameless-atoll-19839.herokuapp.com/api/company/log - Shows you the complete log of events that have happened at the company.
  
  - https://nameless-atoll-19839.herokuapp.com/api/company/employees - Shows you the employees currently working at the company.
  
  - https://nameless-atoll-19839.herokuapp.com/api/company/totalsalary - Shows you the current salary of all employees added together.
  
  - https://nameless-atoll-19839.herokuapp.com/api/company/allsalary - Shows you all the individual salaries as well as a total salary of the company.
  
  - https://nameless-atoll-19839.herokuapp.com/api/company/positions - Shows you the current positions that work within the company.
  
  - https://nameless-atoll-19839.herokuapp.com/api/company/allnames - Shows you the names of all the people working at the company.
  
Note that the Company has the opportity to change through a random event every 15 seconds. Check back from time to time to see how the company is doing!

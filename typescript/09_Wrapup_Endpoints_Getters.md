# Typescript Series - Lecture 9

## Wrap up - Endpoints and getters

At this point, we should have a fully functional company. We now just need to set it up so we can extract data out of the 
company after it is created.

This happens in the relationship between `app.ts` and `company.ts`. An endpoint is created in `app` then a corrisponding 
method is created in `company` to return the info. There really is no solid requirement here. The company is full of data,
so its more up to you how you would like to do this. Below will be a set of examples to check out! I would challenge you to 
come up with your own.

---

## All first names

`app.ts`

```typescript
app.get('/api/staff/names/first', (req: express.Request, res: express.Response) => {
    res.send({
        first_names : scottsCompany.getFirstNames()
    });
});
```

`company.ts`

```typescript
public getFirstNames(): string[] {
    const firstNames: string[] = [];

    for(let i = 0; i < this.employees.length; i++) {
        firstNames.push(this.employees[i].getFirstName());
    }

    return firstNames;
}
```

---

## All last names

`app.ts`

```typescript
app.get('/api/staff/names/last', (req: express.Request, res: express.Response) => {
    res.send({
        last_names : scottsCompany.getLastNames()
    });
});
```

`company.ts`

```typescript
public getLastNames(): string[] {
    const lastNames: string[] = [];

    for(let i = 0; i < this.employees.length; i++) {
        lastNames.push(this.employees[i].getLastName());
    }

    return lastNames;
}
```

---

## All full names

`app.ts`

```typescript
app.get('/api/staff/names/full', (req: express.Request, res: express.Response) => {
    res.send({
        full_names : scottsCompany.getFullNames()
    });
});
```

`company.ts`

```typescript
public getFullNames(): string[] {
    const fullNames: string[] = [];

    for(let i = 0; i < this.employees.length; i++) {
        fullNames.push(this.employees[i].getFullName());
    }

    return fullNames;
}
```

---

## Total Salaries

`app.ts`

```typescript
app.get('/api/salary/total', (req: express.Request, res: express.Response) => {
    res.send({
        total_salaries: scottsCompany.getTotalSalaries()
    })
});
```

`company.ts`

```typescript
public getTotalSalaries(): number {
    let total: number = 0;

    for(let i = 0; i < this.employees.length; i++) {
        total += this.employees[i].getSalary();
    }

    return total;
}
```

---

## All Salaries

`app.ts`

```typescript
app.get('/api/salary/all', (req: express.Request, res: express.Response) => {
    res.send({
        all_salaries: scottsCompany.getAllSalaries()
    });
});
```

`company.ts`

```typescript
public getAllSalaries(): number[] {
    let salaryList: number[] = [];

    for(let i = 0; i < this.employees.length; i++) {
        salaryList.push(this.employees[i].getSalary());
    }

    return salaryList;
}
```

---

## Get All History

`app.ts`

```typescript
public getLog(): string[] {
    return this.historyLog.getFullLog();
}
```

`company.ts`

```typescript
public getLog(): string[] {
    return this.historyLog.getFullLog();
}
```

---

## Ideas:

- Get all those who were fired.
- Get all those who quit.
- Get all hiring logs.

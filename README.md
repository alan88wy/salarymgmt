# Salary Management Solution

This is a simple salary management solution. It uses SQLite3 to store the data.

Two tables are created:

1. Salary

   To store salary data.

```create table salary(id text primary key asc, login text unique, name text, salary decimal);```

2. user

   To store user data

   ```create table user(id text primary key asc, password text);```



### Default login:

userid : admin
password : admin

### To run:

* type "npm run dev" to run in development environment.
* for production, need to change the server name to actual production server name

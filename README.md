# Salary Management Solution

This is a simple salary management solution. It uses SQLite3 to store the data.

Two tables are created:

1. Salary

   To store salary data.

```create table salary(id text primary key asc, login text unique, name text, salary decimal);```

2. user

   To store user data

   ```create table user(id text primary key asc, password text);```



## To do

   1. User Login verification still not working
   2. After edit or delete, it does not automatically close the edit/delete windows. Need to reload the page.
   3. Search function
   4. Display user icons
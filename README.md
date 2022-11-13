

sqlite> .open salary.db
sqlite> select * from salary;
sqlite> .schema salary
sqlite> create table salary(id text primary key asc, login text unique, name text, salary decimal);
sqlite> insert into salary(id, login, name, salary) values ("a2", "a12", "a1", 1000.00);
sqlite> insert into salary(id, login, name, salary) values ("a1", "a1", "a1", 1000.00);



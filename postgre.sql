CREATE DATABASE company_db;



-- Insert
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary NUMERIC(10,2),
    department VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO employees(name, email, salary, department)
VALUES
('Shuvo', 'shuvo@gmail.com', 41000, 'IT'),
('Riad', 'riad@gmail.com', 47000, 'Finance'),
('Tania', 'tania@gmail.com', 53000, 'HR'),
('Nayeem', 'nayeem@gmail.com', 62000, 'Marketing'),
('Oishe', 'oishe@gmail.com', 38000, 'Support');

--ashow all data
SELECT * FROM employees;
-- show specific column
SELECT name, salary FROM employees;

-- Find employees whose salary is greater than 40000.
SELECT * FROM employees WHERE salary > 40000;

--Use ORDER BY
SELECT * FROM employees ORDER BY salary DESC;

--UPDATE Data
UPDATE employees SET salary = 80000 WHERE name = 'Shuvo';

--check update
SELECT * FROM employees WHERE name = 'Shuvo';

--delete data
DELETE FROM employees WHERE name= 'Oishe';
--or 
DELETE FROM employees WHERE id = 5;
--check delete
SELECT * FROM employees;

--BETWEEN
SELECT *FROM employees WHERE salary BETWEEN 40000 AND 60000;

--IN
SELECT * FROM employees WHERE department IN('IT','HR');

--COUNT
SELECT COUNT (*) AS total_employees FROM employees;


--avg salary
SELECT AVG(salary) AS average_salary FROM employees;

--group by department
SELECT depertment, COUNT (*) AS total_employees FROM employees GROUP BY department;

--having
SELECT depertment, COUNT (*)AS total_employees FROM employees GROUP BY department HAVING COUNT(*) > 2;

--ADD CONSTRAINT
SELECT department, COUNT(*) AS total_employee
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;

-- Add Constraints
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT DEFAULT 0,
)

--FOREIGN KEY
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
)

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount NUMERIC(10,2),

    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
);

--Insert Sample Data
INSERT INTO users(name)
VALUES
('Naim'),
('Rahim');

INSERT INTO orders(user_id, amount)
VALUES
(1, 5000),
(2, 7000),
(1, 3000);

--inner join
SELECT users.name, orders.amount
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
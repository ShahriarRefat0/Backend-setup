# Prisma ORM Questions and Answers

## 1. What is Prisma ORM and why is it used in backend development?

Prisma ORM is a modern Object Relational Mapping (ORM) tool for Node.js and TypeScript applications. It helps developers interact with databases using JavaScript or TypeScript instead of writing raw SQL queries.

Prisma provides:
- Prisma Client
- Prisma Schema
- Prisma Migrate

### Why Prisma is used in backend development:
- Easy database queries using JavaScript/TypeScript
- Type safety and auto-completion
- Faster development process
- Cleaner and more maintainable code
- Supports multiple databases like PostgreSQL, MySQL, SQLite, MongoDB, and SQL Server
- Simplifies database migrations

### Example:
```ts
const users = await prisma.user.findMany();
```

Instead of writing:
```sql
SELECT * FROM users;
```

---

## 2. What is the difference between `findUnique()` and `findFirst()` in Prisma?

### `findUnique()`
- Used to find a single record using a unique field.
- Works only with fields marked as `@unique` or `@id`.

### Example:
```ts
const user = await prisma.user.findUnique({
  where: {
    email: "refat@gmail.com",
  },
});
```

Here, `email` must be unique.

---

### `findFirst()`
- Used to find the first record that matches a condition.
- Does not require a unique field.

### Example:
```ts
const user = await prisma.user.findFirst({
  where: {
    name: "Refat",
  },
});
```

If multiple users have the same name, Prisma returns the first matching record.

---

### Main Difference

| Feature | findUnique() | findFirst() |
|---|---|---|
| Requires unique field | Yes | No |
| Returns | One unique record | First matching record |
| Performance | Faster | Slightly slower |
| Usage | ID, email, username | General filtering |

---

## 3. What is Prisma Migration and why is `prisma migrate dev` used?

Prisma Migration is a system that helps manage database schema changes in a structured and version-controlled way.

Whenever the schema changes, Prisma creates migration files and updates the database automatically.

### `prisma migrate dev`
This command is mainly used during development.

### What it does:
- Creates a new migration file
- Updates the database schema
- Regenerates Prisma Client

### Command:
```bash
npx prisma migrate dev --name init
```

### Example:
If you add a new field in `schema.prisma`:

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

Running:
```bash
npx prisma migrate dev --name add-user-model
```

will:
1. Create migration SQL files
2. Update the database
3. Generate updated Prisma Client

---

## 4. Explain the difference between `select` and `include` in Prisma with examples.

Both `select` and `include` are used to control the data returned from the database.

---

## `select`
Used to fetch specific fields only.

### Example:
```ts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    name: true,
    email: true,
  },
});
```

### Output:
```json
{
  "name": "Refat",
  "email": "refat@gmail.com"
}
```

Only selected fields are returned.

---

## `include`
Used to include related models (relations).

### Example:
```ts
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: true,
  },
});
```

### Output:
```json
{
  "id": 1,
  "name": "Refat",
  "email": "refat@gmail.com",
  "posts": [
    {
      "id": 1,
      "title": "My First Post"
    }
  ]
}
```

Related `posts` data is included.

---

### Main Difference

| Feature | select | include |
|---|---|---|
| Purpose | Select specific fields | Include related data |
| Returns | Chosen fields only | Full model + relations |
| Used for | Field filtering | Relation fetching |

---

## 5. What is the purpose of the Prisma schema file (`schema.prisma`) and what are its main sections?

The `schema.prisma` file is the main configuration file of Prisma. It defines:
- Database connection
- Data models
- Prisma Client settings

It acts as the blueprint of the database structure.

---

## Main Sections of `schema.prisma`

### 1. Generator Block
Defines which Prisma Client will be generated.

### Example:
```prisma
generator client {
  provider = "prisma-client-js"
}
```

---

### 2. Datasource Block
Defines database connection details.

### Example:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### 3. Model Block
Defines database tables and relationships.

### Example:
```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

---

## Example Full `schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

---
# Api Testing

![Api testing](https://drive.google.com/file/d/1gzexLbc-2JrAvtQoyEzpPBe3EYRYKmJu/view?usp=sharing)
---

````md
# SQL Interview Questions & Answers

## 1. What is the difference between DELETE, TRUNCATE, and DROP?

| Command | Description |
|----------|-------------|
| DELETE | Removes specific rows from a table using `WHERE`. Table structure remains. |
| TRUNCATE | Removes all rows quickly. Cannot use `WHERE`. Table structure remains. |
| DROP | Deletes the entire table including structure and data. |

### Example
```sql
DELETE FROM employees WHERE id = 1;

TRUNCATE TABLE employees;

DROP TABLE employees;
````

---

# 2. What is a PRIMARY KEY?

A PRIMARY KEY is a column (or set of columns) that uniquely identifies each row in a table.

## Features

* Cannot contain `NULL`
* Must be unique
* One table can have only one PRIMARY KEY

### Example

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
```

---

# 3. What is the difference between PRIMARY KEY and UNIQUE KEY?

| PRIMARY KEY              | UNIQUE KEY              |
| ------------------------ | ----------------------- |
| Cannot contain NULL      | Can contain one NULL    |
| Only one per table       | Multiple allowed        |
| Uniquely identifies rows | Also ensures uniqueness |

---

# 4. What is a FOREIGN KEY?

A FOREIGN KEY is a column that creates a relationship between two tables.

### Example

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

Here, `customer_id` is a FOREIGN KEY.

---

# 5. What is JOIN in SQL?

A JOIN combines rows from multiple tables based on related columns.

## INNER JOIN

Returns only matching rows from both tables.

### Example

```sql
SELECT *
FROM students
INNER JOIN courses
ON students.id = courses.student_id;
```

## LEFT JOIN

Returns all rows from the left table and matching rows from the right table.

### Example

```sql
SELECT *
FROM students
LEFT JOIN courses
ON students.id = courses.student_id;
```

---

# 6. What is Normalization?

Normalization is the process of organizing data to reduce redundancy and improve data integrity.

## 1NF (First Normal Form)

* No duplicate columns
* Atomic values only

## 2NF (Second Normal Form)

* Must be in 1NF
* No partial dependency

## 3NF (Third Normal Form)

* Must be in 2NF
* No transitive dependency

---

# 7. What is Indexing?

An INDEX improves the speed of data retrieval.

## Why do we use INDEX?

* Faster searching
* Faster sorting
* Improves query performance

### Example

```sql
CREATE INDEX idx_name
ON employees(name);
```

---

# 8. What is the difference between WHERE and HAVING?

| WHERE                           | HAVING                               |
| ------------------------------- | ------------------------------------ |
| Filters rows before grouping    | Filters after grouping               |
| Used without aggregate function | Mostly used with aggregate functions |

### Example

```sql
SELECT department, COUNT(*)
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

---

# 9. What is a Transaction in SQL?

A transaction is a group of SQL operations executed together.

## COMMIT

Saves changes permanently.

### Example

```sql
COMMIT;
```

## ROLLBACK

Undoes changes before commit.

### Example

```sql
ROLLBACK;
```

---

# 10. Write a query to find the second highest salary.

```sql
SELECT MAX(salary) AS second_highest_salary
FROM employees
WHERE salary < (
    SELECT MAX(salary)
    FROM employees
);
```

---

```
```


---


# Database Interview Questions & Answers

---

# 1. What is the difference between Primary Key and Foreign Key?

| Primary Key | Foreign Key |
|---|---|
| Uniquely identifies a row | Connects one table with another |
| Cannot be duplicate | Can be duplicate |
| Cannot be NULL | Can be NULL |
| One table usually has one primary key | A table can have multiple foreign keys |

## Example

### Users Table

| id (PK) | name |
|---|---|
| 1 | Refat |

### Orders Table

| order_id | user_id (FK) |
|---|---|
| 101 | 1 |

---

# 2. Why is normalization important?

Normalization helps to:

- Reduce duplicate data
- Improve consistency
- Save storage
- Prevent update/delete anomalies

## Example

Instead of storing user information repeatedly in orders table:

- Create `users` table
- Create `orders` table

This keeps the database clean and scalable.

---

# 3. What is a JOIN?

JOIN combines data from multiple tables using related columns.

## Types of JOIN

- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL JOIN

## Example

```sql
SELECT users.name, orders.product
FROM users
JOIN orders
ON users.id = orders.user_id;
```

---

# 4. Difference between SQL and MongoDB

| SQL | MongoDB |
|---|---|
| Relational database | NoSQL database |
| Table-based | Document-based |
| Fixed schema | Flexible schema |
| Uses SQL queries | Uses JSON-like documents |
| Better for complex relationships | Better for scalability |

## SQL Example

```sql
CREATE TABLE users (
  id INT,
  name VARCHAR(50)
);
```

## MongoDB Example

```json
{
  "name": "Refat"
}
```

---

# 5. What is a composite key?

A composite key uses multiple columns together as a primary key.

## Example

| student_id | course_id |
|---|---|
| 1 | C101 |

Both columns together uniquely identify the row.

---

# 6. What is a weak entity?

A weak entity depends on another entity to exist.

## Example

- Employee → Strong Entity
- Dependent → Weak Entity

A dependent cannot exist without an employee.

---

# 7. Why do we use constraints?

Constraints enforce rules in the database.

## Types of Constraints

- PRIMARY KEY
- FOREIGN KEY
- UNIQUE
- NOT NULL
- CHECK
- DEFAULT

## Example

```sql
email VARCHAR(100) UNIQUE
```

This prevents duplicate emails.

---

# 8. Explain many-to-many relationship

Many records in one table can relate to many records in another table.

## Example

- Students can join many courses
- Courses can contain many students

A junction table is used:

| student_id | course_id |
|---|---|
| 1 | C101 |

---

# 9. Difference between Clustered and Non-Clustered Index

| Clustered Index | Non-Clustered Index |
|---|---|
| Sorts actual table data | Separate structure from data |
| Faster for range queries | Faster for searching |
| Only one per table | Multiple allowed |

## Example

- Clustered Index → `id`
- Non-Clustered Index → `email`

---

# 10. Explain Database Sharding and Partitioning

# Partitioning

Partitioning splits a large table into smaller parts inside the same server.

## Example

Orders table divided by:

- Year
- Region

## Used When

- Table becomes huge
- Performance optimization needed

---

# Sharding

Sharding splits database across multiple servers.

## Example

- Asia users → Server 1
- Europe users → Server 2

## Used When

- Traffic becomes massive
- One server cannot handle load
- Horizontal scaling needed

---

# Main Difference

| Partitioning | Sharding |
|---|---|
| Same server | Multiple servers |
| Internal split | Distributed split |
| Improves management | Improves scalability |


```  
### Multi vendor add product ERD:- https://drive.google.com/file/d/18lLk64rT3wpDLkJ8z1Y--ikIo_bCC951/view?usp=sharing 

```  










# Backend Project Setup

## 1. Initialize Project

```bash
npm init -y
```

---

## 2. Install Dependencies

### Main Dependencies

```bash
pnpm add cookie-parser cors dotenv express http-status tsx typescript zod
```
### Create tsconfig.json

```bash
npx tsc --init
```

### Dev Dependencies

```bash
pnpm add -D @types/cookie-parser @types/cors @types/express
```

---

## 3. Approve Builds

```bash
pnpm approve-builds
```

Select:
- esbuild → Space
- Enter

---

## 4. Run Project

```bash
pnpm dev
```

---

## 5. Build Project

```bash
pnpm build
```

---

## 6. Package.json Scripts

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc"
}
```

---

## 7. Create Folder Structure

```bash
src/
 ├── server.ts
 ├── app/
 ├── config/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── middlewares/
 └── utils/
```

---

## 8. Basic Server Code

### src/server.ts

```ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
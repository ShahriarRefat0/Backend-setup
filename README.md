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
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
import type  { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./app/routes/routes";
import notFound from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalError";


const app:Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//base url

app.use("/api/v1", routes)

app.get("/", (req: Request, res: Response)=>{
    res.json("data from server");
})

app.use(notFound)
app.use(globalErrorHandler)

export default app;
import express, { type Application, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalError";
import routes from "./app/routers/routes";
// import routes from "./app/routers/routes";

const app: Application = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

//base userl
app.use('/api/v1', routes);


app.get("/", (req: Request, res: Response)=>{
    res.json("Server running successfully")
})



app.use(notFound);
app.use(globalErrorHandler);

export default app;
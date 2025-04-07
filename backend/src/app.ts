import express from 'express';
import {config} from "dotenv";
import morgan from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
config();
const app = express();
//HTTP verbs
//GET - get some data from the database
//PUT - update or modufy some data
//POST - post some data
//DELETE - to delete some data

//middlewares
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));

app.use("/api/v1",appRouter)
export default app;
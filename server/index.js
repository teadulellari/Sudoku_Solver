import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import sudokuRouter from "./routes/sudokuRouter.js";
import signupRouter from "./routes/signupRouter.js";
import verifyRouter from "./routes/verifyRouter.js";
import loginRouter from "./routes/loginRouter.js";
import routerCheckSessionValidity from "./routes/loginRouter.js";
import checkUserRouter from "./routes/checkUserRouter.js";
import recoverPasswordRouter from "./routes/checkUserRouter.js";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
//create instance of the app
const app = express();
dotenv.config();

//establishing middlewares
app.use(
  cors({
    preflightContinue: true,
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//configure session middleware
app.use(
  session({
    secret: uuidv4(),
    resave: false, // session will only be saved if it has been modified during the request
    saveUninitialized: true, //a new session will be created even if the request doesn't explicitly use the session middleware
    cookie: { secure: false }, // HTTPS and HTTP
  })
);

//mounting routes
app.use("/api", sudokuRouter);
app.use("/api", signupRouter);
app.use("/api", loginRouter);
app.use("/api", verifyRouter);
app.use("/api", routerCheckSessionValidity);
app.use("/api", checkUserRouter);
app.use("/api", recoverPasswordRouter);

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;

//connect to db
mongoose.connect(mongoURI);
const database = mongoose.connection;

//test the conection if error
database.on("error", (error) => {});

//check with this event listener if the process happened once
database.once("connected", () => {});

app.listen(PORT, () => {});

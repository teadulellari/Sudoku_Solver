import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import routerSudoku from './routes/routerSudoku.js';
import routerSignUp from './routes/routerSignUp.js';
import routerVerify from './routes/routerVerify.js'
import routerLogIn from './routes/routerLogIn.js'
import routerCheckSessionValidity  from './routes/routerLogIn.js';
import routerChechUser from './routes/routerCheckUser.js';
import routerRecoverPassword from './routes/routerCheckUser.js';
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
//create instance of the app
const app = express();
dotenv.config();

//establishing middlewares
app.use(cors({ preflightContinue:true, origin:["http://localhost:3000"], credentials: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//configure session middleware
app.use(session({
  secret: uuidv4(),
  resave: false, // session will only be saved if it has been modified during the request
  saveUninitialized: true, //a new session will be created even if the request doesn't explicitly use the session middleware
  cookie: { secure: false,
            maxAge: 60000 ,
   } // HTTPS and HTTP
}));


//mounting routes
app.use('/api', routerSudoku);
app.use('/api', routerSignUp);
app.use('/api', routerLogIn);
app.use('/api', routerVerify);
app.use('/api', routerCheckSessionValidity);
app.use('/api', routerChechUser);
app.use('/api', routerRecoverPassword);



const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT;

//connect to db
mongoose.connect(mongoURI);
const database = mongoose.connection;

//test the conection if error
database.on("error", (error) => {
  console.log(error);
});

//check with this event listener if the process happened once
database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import routerSudoku from './routes/routerSudoku.js';
import routerSignUp from './routes/routerSignUp.js';

//create instance of the app
const app = express();
dotenv.config();

//establishing middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//mounting routes
app.use('/api', routerSudoku);
app.use('/api', routerSignUp);


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

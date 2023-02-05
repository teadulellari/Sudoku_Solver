import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";

import SudokuModel from './models/sudokuModel.js';


const app = express();
dotenv.config();
const router = express.Router();
//establishing middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', router)
const mongoURI = process.env.MONGO_URI;

//connect to db
mongoose.connect(mongoURI)
const database = mongoose.connection

//test the conection if error
database.on('error', (error) => {
    console.log(error);
});

//check with this event listener if the process happened once
database.once('connected', () => {
    console.log('Database Connected');
  });



  //initial route
  app.get('/', (req, res) => {
    res.send("Hi!");
  });















  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port' + listener.address().port);
  });
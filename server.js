import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './routes/studRoute.js';
import cors from 'cors';

//config dotenv
dotenv.config({ quiet: true });

//rest object
const app = express();

//middlewares

app.use(bodyParser.json());
app.use(cors());

//port
const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.Mongo_URL;


//listen
mongoose.connect(MONGOURL).then(() => {
  console.log("MongoDB is connected successfully");
  
})
.catch((error) => { console.log(error) });

app.use('/api',route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
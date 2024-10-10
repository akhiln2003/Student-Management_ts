import express from "express";
import * as dotenv from 'dotenv';

import connectDB from './config/db'
import routes from "./routes/routes";
import cors from 'cors';

dotenv.config(); 
const port : number | string =  process.env.PORT || 5000


connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cors())
app.use('/api' , routes );


app.listen(port , ()=>{

    console.log("http://localhost:3000");
    
})
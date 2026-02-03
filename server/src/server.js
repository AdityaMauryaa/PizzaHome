import express from 'express';
import dotenv from "dotenv";
dotenv.config({path: "../.env"});
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
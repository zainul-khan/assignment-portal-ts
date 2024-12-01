import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import dbConn from "./db/conn";
import adminRouter from "./routes/admin.route";
import userRouter from "./routes/user.route";
const Port = process.env.PORT || 8000;
const app = express();
dbConn()

app.use(express.json())

app.use('/admin', adminRouter);
app.use('/api', userRouter);

app.listen(Port, () => {
  console.log(`Listening to app on port ${Port}`);
}).on('error', (error: Error) => {
  console.log('Error encountered while listening', error);
});
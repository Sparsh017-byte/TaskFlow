import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();
import cors from 'cors';
const PORT = process.env.PORT || 5000;

import connectToDb from './config/db.js';
connectToDb();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/user", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


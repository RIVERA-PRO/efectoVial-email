import express from 'express';
import 'dotenv/config.js';
import './config/database.js';
import indexRouter from './routes/index.js';

import { __dirname } from './utils.js';
import cors from 'cors';

const app = express();


app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', indexRouter);

export default app;

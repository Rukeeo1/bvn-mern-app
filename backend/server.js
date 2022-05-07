const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./Middleware/ErrorMiddleware');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use('/api/userBvn', require('./routes/UserBvnRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));

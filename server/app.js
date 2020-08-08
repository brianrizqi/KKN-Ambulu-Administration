require('express-async-errors');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const {notFoundHandler, errorHandler} = require('./middlewares');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/auth');
const testRouter = require('./routes/test');
const letterRouter = require('./routes/letter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

app.use('/auth', authRouter);
app.use('/test', testRouter);
app.use('/letter', letterRouter);

app.use(errorHandler);
app.use(notFoundHandler);

module.exports = app;

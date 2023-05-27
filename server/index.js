require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const productsRoutes = require('./routes/productsRoutes');
const pgdb = require('./db/postgresql');
const mgdb = require('./db/mongodb');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', productsRoutes);

module.exports = app;
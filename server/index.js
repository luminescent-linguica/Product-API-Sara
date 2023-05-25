require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const postgresqlRoutes = require('./routes/postgresqlRoutes');
const pgdb = require('./db/postgresql');
const mgdb = require('./db/mongodb');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/postgresql', postgresqlRoutes);

module.exports = app;
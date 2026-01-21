const cors = require('cors');
const express = require('express');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', orderRoutes);

module.exports = app;
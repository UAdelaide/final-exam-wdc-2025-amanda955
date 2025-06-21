const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// storing session in express q13
const session = require('express-session');

app.use(session({
    secret: '69696969',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
// dog routes for question 15
const dogRoutes = require('./routes/dogRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);


// Export the app instead of listening here
module.exports = app;
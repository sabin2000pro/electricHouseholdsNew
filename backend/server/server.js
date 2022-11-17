/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const express = require('express');
const path = require('path');
const cors= require("cors");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const xss = require('xss-clean');
const hpp = require('hpp')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const morgan = require('morgan');
const app = express(); 
const port = process.env.PORT || 5200;
const {connectDatabase} = require('../database/db');

const sessionConfig = {

    secret: 'MYSECRET',
    name: 'ehouseholds',
    resave: false,
    saveUninitialized: false,

    cookie : {
      sameSite: 'strict', // THIS is the config you are looing for.
    }
  };
  

// Import the Routes Here
const authRoutes = require('../routes/authRoutes');
const bidRoutes = require('../routes/bidsRoutes');
const applianceRoutes = require('../routes/applianceRoutes');
const preferenceRoutes = require('../routes/preferencesRoutes');
const timeslotRoutes = require('../routes/timeslotsRoutes');
const commentRoutes = require('../routes/commentRoutes');
const reviewRoutes = require('../routes/reviews/reviewRoutes');
const contactRoutes = require('../routes/contactRoutes');
const feedbackRoutes = require('../routes/feedbackRoutes');
const botRoutes = require('../routes/botRoutes');
const creditRoutes = require('../routes/creditRoutes');
const satisfactionRoutes = require('../routes/satisfactionRoutes');

connectDatabase();

// 1. Set up middleware
app.use(cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"]
})) // Use this after the variable declaration

app.use(express.json());
app.use(xss());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(fileUpload());
app.use(hpp());
app.use(helmet());


// 2. Mount the routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appliances', applianceRoutes);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/timeslots', timeslotRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/bids', bidRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/bot', botRoutes);
app.use('/api/v1/credits', creditRoutes);
app.use('/api/v1/satisfaction', satisfactionRoutes);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if(process.env.NODE_ENV === 'production') {// Get the index.html

    app.get('*', (request, response, next) => {
        return request.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    });

    app.set('trust proxy', 1); // trust first proxy
        sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig));

// Create Server to listen for incoming requests
const server = app.listen(port, (err) => {

    try {

        if(!err) { // If no error occurred fgwg . Set some configs
            return console.log(`Listening for requests on port ${port} in environment ${process.env.NODE_ENV}`);
        }

        else {
            return console.error(`Could not listen for requests : ${err}`);
        }
    } 
    
    catch(error) { // Catch error if arises

        if(error) {
            return console.error(err);
        }
    }
});

// Handle server crashes
process.on('uncaughtException', (err, promise) => { // Re-installed packages
    
    if(err) {
        return console.error(err);
    }

    // Close the server by exiting the process
    return server.close(() => {
        return process.exit(1);
    });


});

process.on('unhandledRejection', (error, promise) => {

    return server.close(() => {
        console.log(`Server closed the connection due to unhandled rejection error : ${error.message}`);
        process.exit(1);
    })

});

// Handle 404 Routes
app.all('*', (request, response, next) => {

    if(request.method === 'GET') {
        
        response.status(404).json({status: 'Fail', message: 'The route you requested is not valid'});
        return next();
    }

});

module.exports = server; // Export server as a module to be reused
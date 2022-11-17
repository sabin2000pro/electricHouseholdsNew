

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Establish a Database Connection
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const fs = require('fs');
require('dotenv').config();
const Timeslots = require('../models/timeslotsModel');
const Admin = require('../models/userModel');
const Appliance = require('../models/applianceModel');
const Preference = require('../models/preferencesModel');
const {connectDatabase} = require('../database/db');

const admins = JSON.parse(fs.readFileSync('../data/admins.json'));
const timeslots = JSON.parse(fs.readFileSync('../data/timeslots.json'));
const appliances = JSON.parse(fs.readFileSync('../data/appliances.json'));
const preferences = JSON.parse(fs.readFileSync('../data/preferences.json'));

connectDatabase();

const importData = async () => {

    try {

        await Timeslots.create(timeslots);
        await Appliance.create(appliances);
        await Preference.create(preferences);
        await Admin.create(admins);
    
        console.log("All data imported to database success..");
        process.exit(1);
        
    } 
    
    catch(err) {

        if(err) {
           return console.error(err);
        }


    }
};

const removeData = async () => {

    try {

        await Timeslots.deleteMany();
        await Appliance.deleteMany();

        await Preference.deleteMany();
        await Admin.deleteMany();

        console.log(`All data removed`);
        process.exit(1);

    } 
    
    catch(err) {

        if(err) {
            return console.log(err);
        }

    }  
}

if(process.argv[2] === '--import') {
    return importData();
}

if(process.argv[2] === '--remove') {
    return removeData();
}
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
const preferenceRouter = express.Router();
const preferenceController = require('../controllers/preferencesController');
const rateLimit = require('express-rate-limit');

preferenceRouter.route('/create-preference').post(preferenceController.createPreference);
preferenceRouter.route('/fetch-preferences').get(preferenceController.fetchAllPreferences);
preferenceRouter.route('/fetch-preferences/:id').get(preferenceController.getPreferenceByID);
preferenceRouter.route('/delete-preferences').delete(preferenceController.deleteAllPreferences);
preferenceRouter.route('/delete-preference/:id').delete(preferenceController.deletePreference);
preferenceRouter.route('/edit-preference/:id').put(preferenceController.editPreference);

module.exports = preferenceRouter; // Exports the Preference Router
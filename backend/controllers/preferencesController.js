/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const Preference = require('../models/preferencesModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;

module.exports.createPreference = catchAsync(async (request, response, next) => {

    const {appliance, firstPreference, secondPreference, thirdPreference, nextAppliance, lastAppliance, day} = request.body;

    if(request.method === 'POST') { // If there is a POST request -> create the preference

        const newPreference = new Preference({appliance, firstPreference, secondPreference, thirdPreference, nextAppliance, lastAppliance, day});
        await newPreference.save();
        
        return response.status(created).json({newPreference});
    }

});

module.exports.getPreferenceByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Preference with that ID not found"});
    }

    const preference = await Preference.findById(id);
    return response.status(ok).json({preference});
});

module.exports.fetchAllPreferences = catchAsync(async (request, response, next) => {

    if(request.method === 'GET') {
        const preferences = await Preference.find();
        return response.status(ok).json({preferences});
    }

});

module.exports.editPreference = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Could not find the preference with that ID"});
    }

    if(request.method == 'PUT') {

        const updatedPreference = await Preference.findByIdAndUpdate(id, request.body);
        await updatedPreference.save();

        return response.status(ok).json({updatedPreference});

    }
});

module.exports.deletePreference = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Could not find the preference with that ID"});
    }

    if(request.method === 'DELETE') {
        await Preference.findByIdAndDelete(id);
        return response.status(204).json("Preference Deleted");
    }

});

module.exports.deleteAllPreferences = catchAsync(async(request, response, next) => {

    if(request.method === 'DELETE') {

        await Preference.deleteMany();
        return response.status(noContent).json("Preferences Deleted");
    }
})
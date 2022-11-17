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

const Credit = require('../models/creditModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;

module.exports.createCredits = catchAsync(async (request, response, next) => {
    const {virtualCredits, creditsLeft} = request.body;

    const newCredit = new Credit({virtualCredits, creditsLeft});
    await newCredit.save();

    return response.status(created).json("Credits Created");
});

module.exports.deleteCredits = catchAsync(async (request, response, next) => {
    await Credit.deleteMany();

    return response.status(204).json("Credits Deleted");

});

module.exports.deleteCreditByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(request.method === 'DELETE') {
        await Credit.findByIdAndDelete(id);

        return response.status(noContent).json("Credit Deleted");
    }
})

module.exports.getCreditByID = catchAsync(async (request, response, next) => {
    const credit = await Credit.findById(request.params.id);
    return response.status(ok).json({credit});
});

module.exports.updateCredits = catchAsync(async (request, response, next) => {

    const virtualCredits = request.body.virtualCredits;
    const creditsLeft = request.body.creditsLeft;    
    const id = request.params.id;

    await Credit.findById(id, (err, updatedVirtualCredits) => {
        updatedVirtualCredits.virtualCredits = virtualCredits;
        updatedVirtualCredits.creditsLeft = creditsLeft;

        updatedVirtualCredits.save();

        return response.status(ok).json("Virtual Credits Updated");
    }).clone().catch(err => {console.log(err)});
    
});

module.exports.getAllCredits = catchAsync(async (request, response, next) => {
    const allCredits = await Credit.find();
    return response.status(ok).json({allCredits});
})
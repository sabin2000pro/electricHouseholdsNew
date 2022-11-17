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

const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const ok = 200;
const created = 201;
const notFound = 204;
const serverError = 500;
const badRequest = 400;

module.exports.getAllContacts = catchAsync(async (request, response, next) => {

    if(request.method === 'GET') {
        const allContacts = await Contact.find();
        return response.status(200).json({allContacts});
    }
    
});

module.exports.getContactByID = catchAsync(async (request, response, next) => {

    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Contact with that ID not found"});
    }

    const theContact = await Contact.findById(id);
    return response.status(ok).json({theContact});
});

module.exports.createContact = catchAsync(async (request, response, next) => {

    if(request.method === 'POST') {
        const {firstName, lastName, username, emailAddress, issueType, description} = request.body;

        if(!firstName || !lastName || !username || !emailAddress || !issueType || !description) {
            return response.status(400).json({status: "Fail", message: "Please check your Contact us entries"});
        }

        const newContact = new Contact({firstName, lastName, username, emailAddress, issueType, description});
        await newContact.save(); // Save the contact to the database

        return response.status(created).json({newContact});
        
    }
});

module.exports.editContact = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Contact with that ID not found"});
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, request.body);
    await updatedContact.save();

    return response.status(200).json({status: 'Success', message: "Contact Updated"});

});

module.exports.deleteAllContacts = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Contact.deleteMany();

        return response.status(204).json("All contacts deleted");
    }
});

module.exports.deleteContactByID = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        const id = request.params.id;
    }
});
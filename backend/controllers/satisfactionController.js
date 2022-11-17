const Satisfaction = require('../models/satisfactionModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createSatisfaction = catchAsync(async (request, response, next) => {
    const {satisfaction, reason} = request.body;

    if(!satisfaction || !reason) {
        return response.status(400).json({message: "Missing entries"});
    }

    const newSatisfaction = new Satisfaction({satisfaction, reason});
    await newSatisfaction.save();

    return response.status(201).json({status: "Success", message: "Satisfaction Created.."});

})
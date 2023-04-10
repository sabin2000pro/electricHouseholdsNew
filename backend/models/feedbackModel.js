const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({ // The Feedback Mongoos Schema

    name: {
        type: String,
        required: [true, 'You must specify username']
    },

    feeling: {
        type: String,
        enum: ['Happy', 'Unhappy', 'Satisfied', 'Neutral', 'Very Happy'],
        required: [true, 'You must specify a feeling']
    },

    description: {
        type: String,
        minlength: 10,
        required: [true, 'You must specify the feedback description after the bidding'],
    },

    reason: {
        type: String,
        required: [true, 'Please provide your reason for the feeling']
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
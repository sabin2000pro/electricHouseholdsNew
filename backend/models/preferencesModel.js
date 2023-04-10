// User Preferences Model to hold data about the users

const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    
    appliance: {
        type: String
    },

    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    firstPreference: {
        type: String,
        required: [true, 'Please submit your first timeslot preference']
    },

    secondPreference: {
        type: String,
        required: [true, 'Please submit your second timeslot preference']
    },

    thirdPreference: {
        type: String,
        required: [true, 'Please submit your third timeslot preference']
    },

    nextAppliance: {
        type: String,
        default: ''
    },

    lastAppliance: {
        type: String,
        default: ''
    }

});

const Preference = mongoose.model('Preference', preferencesSchema);
module.exports = Preference;
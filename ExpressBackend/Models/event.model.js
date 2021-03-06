const User = require("../Models/user.model");
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    organizerName: {
        type: String,
        required: true
    },
    organizerContact: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model('Event', EventSchema);
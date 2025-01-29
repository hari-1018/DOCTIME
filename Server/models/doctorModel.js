const mongoose = require('mongoose');

const doctorModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    about:{
        type: String,
        required: true,
    },
    qualifications: {
        type: [String],
        required: true,
        default: [],
    },
    specialization: {
        type: String,
        required: true,
    },
    experience:{
        type: Number,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    fees: {
        type: Number,
    },
    slotsBooked: {
        type: Map,
        of: [String], 
        default: {},
    },
},{ timestamps: true });


module.exports = mongoose.model('Doctors', doctorModel);
